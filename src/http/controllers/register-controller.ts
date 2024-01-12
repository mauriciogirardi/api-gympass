import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { RegisterUserCase } from '@/use-cases/register-use-case'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().nullable(),
  })

  const { name, email, phone, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUserCase(usersRepository)
    await registerUseCase.execute({ email, name, password, phone })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
