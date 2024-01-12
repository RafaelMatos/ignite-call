import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'

import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container, Header } from '../styles'
import { CountCharacter, FormAnnotation, ProfileBox } from './styles'
import { useSession } from 'next-auth/react'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { getServerSession } from 'next-auth/next'
import { GetServerSideProps } from 'next/types'
import { api, cloud } from '../../../lib/axios'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { NextSeo } from 'next-seo'
import { MediaPicker } from '@/Components/MediaPicker'
import { useMediaPicker } from '@/hooks/useMediaPicker'
import { Axios } from 'axios'
import { file } from 'googleapis/build/src/apis/file'

const updateProfileSchema = z.object({
  bio: z.string().max(250),
  // avatarUrl: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const { fileToUpload, handleSetPreview } = useMediaPicker()
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null)

  const session = useSession()
  const router = useRouter()
  const [bioCharactersCount, setBioCharactersCount] = useState(0)
  const isMaxCharacter = bioCharactersCount === 250

  // const handleImageUpload = async (file: File) => {
  //   const formData = new FormData()
  //   formData.append('file', file)
  //   formData.append('upload_preset', 'igniteCall')
  //   await cloud.post(`image/upload`, formData).then((response) => {
  //     if (response.data.secure_url) {
  //       api.put('/users/profile', {
  //         bio: data.bio,
  //         avatarUrl: newImageUrl,
  //       })
  //     }
  //   })
  // }

  async function handleUpdateProfile(data: UpdateProfileData) {
    if (fileToUpload) {
      const formData = new FormData()
      formData.append('file', fileToUpload)
      formData.append('upload_preset', 'igniteCall')
      const uploadedImage = await cloud
        .post(`image/upload`, formData)
        .then((response) => {
          if (response.data.secure_url) {
            handleSetPreview(response.data.secure_url)
            api.put('/users/profile', {
              bio: data.bio,
              avatarUrl: response.data.secure_url,
            })
          }
        })

      console.log('uploadedImage', uploadedImage)
    } else {
      await api.put('/users/profile', {
        bio: data.bio,
      })
    }

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const count = event.target.value.length
    setBioCharactersCount(count)
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>
          <MultiStep size={4} currentStep={4} />
        </Header>
        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text size="sm">Foto de perfil</Text>

            {/* <Avatar src={session.data?.user.avatar_url} /> */}
            <MediaPicker urlAvatar={session.data?.user.avatar_url} />
          </label>
          <label>
            <Text size="sm">Sobre você</Text>
            <FormAnnotation size="sm">
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
            <TextArea
              placeholder="Quem eu sou?"
              maxLength={250}
              {...register('bio')}
              onChange={handleChange}
            />
            <CountCharacter size="xs" isMaxCharacters={isMaxCharacter}>
              {bioCharactersCount}/250
            </CountCharacter>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return { props: { session } }
}
