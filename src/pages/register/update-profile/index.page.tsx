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
import { CountCaracteres, FormAnnotation, ProfileBox } from './styles'
import { useSession } from 'next-auth/react'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { getServerSession } from 'next-auth/next'
import { GetServerSideProps } from 'next/types'
import { api } from '../../../lib/axios'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

const updateProfileSchema = z.object({
  bio: z.string().max(250),
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

  const session = useSession()
  const router = useRouter()
  const [bioCharactersCount, setBioCharactersCount] = useState(0)

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
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
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
          <CountCaracteres
            size="xs"
            css={{ color: bioCharactersCount < 250 ? '$gray400' : '#f75a68' }}
          >
            {bioCharactersCount}/250
          </CountCaracteres>
        </label>

        <Button type="submit">
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
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