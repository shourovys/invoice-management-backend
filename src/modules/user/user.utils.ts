import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../../config'
import { UserModel } from './user.model'

export const verifyToken = async (
  req: Request,
  res: Response,
): Promise<string | null> => {
  const token = req.header('x-auth-token') as string | undefined

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' })
    return null
  }

  try {
    const decodedUserId = jwt.verify(token, JWT_SECRET_KEY) as string
    return decodedUserId
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' })
    return null
  }
}

export const generateUserNumber = async (): Promise<number> => {
  const lastUser = await UserModel.findOne(
    {},
    {},
    { sort: { createdAt: -1 } },
  ).exec()
  return lastUser ? lastUser.no + 1 : 1
}
