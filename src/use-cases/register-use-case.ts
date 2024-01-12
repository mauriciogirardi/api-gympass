import { hash } from 'bcryptjs'

type RegisterUseCaseRequest = {
  password: string
  email: string
  name: string
  phone: string | null
}

export class RegisterUserCase {
  constructor(private usersRepository: any) {}

  async execute({ email, name, password, phone }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSomeEmail = await this.usersRepository.findUserByEmail(email)

    if (userWithSomeEmail) {
      throw new Error('E-mail already existes!!')
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash,
      phone,
    })
  }
}
