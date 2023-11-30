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
import { api } from '../../../lib/axios'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { NextSeo } from 'next-seo'

const updateProfileSchema = z.object({
  bio: z.string().max(250),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const { register, handleSubmit } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const session = useSession()
  const router = useRouter()
  const [bioCharactersCount, setBioCharactersCount] = useState(0)
  const isMaxCharacter = bioCharactersCount === 250

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })

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

            <Avatar src={session.data?.user.avatar_url} />
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

          <Button type="submit">
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
