import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
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
    const decodedUserId = jwt.verify(token, 'your-secret-key') as string // Replace 'your-secret-key' with your actual secret key
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
