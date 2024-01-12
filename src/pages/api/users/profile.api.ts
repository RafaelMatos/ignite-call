import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const updateProfileBodySchema = z.object({
  bio: z.string(),
  avatarUrl: z.string().nullish(),
})
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const { bio, avatarUrl } = updateProfileBodySchema.parse(req.body)

  let avatarUrlToSave = avatarUrl || session.user.avatar_url
  if (!avatarUrl) {
    avatarUrlToSave = session.user.avatar_url
  }
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
      avatar_url: avatarUrlToSave,
    },
  })

  // await prisma.userTimeInterval.createMany
  return res.status(201).end()
}
