// src/modules/auth/auth.service.ts

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../../config'
import { IUser } from '../user/user.interface'
import { UserModel } from '../user/user.model'

export const AuthService = {
  login: async (
    email: string,
    password: string,
  ): Promise<{ token: string; user: Omit<IUser, 'password'> }> => {
    const user = await UserModel.findOne({ email }).exec()

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      throw new Error('Invalid credentials')
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
      expiresIn: '1000h',
    })

    const userWithoutPassword = {
      ...user.toObject(),
      password: undefined,
    } as Omit<IUser, 'password'>

    return { token, user: userWithoutPassword }
  },
}
