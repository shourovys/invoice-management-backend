// src/modules/auth/auth.controller.ts

import { NextFunction, Request, Response } from 'express'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'

export const AuthController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await AuthService.login(req.body.email, req.body.password)
      res.json({ data })
    } catch (error) {
      next(error)
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Perform any necessary actions for logout
      res.json({ message: 'Logout successful' })

      // creating admin
      // const userNo = await generateUserNumber()

      // const hashedPassword = await bcrypt.hash('@admin', 10)

      // const user = new UserModel({
      //   no: userNo,
      //   name: 'Admin',
      //   email: 'admin@admin.com',
      //   contactNumber: ' ',
      //   password: hashedPassword,
      //   role: 'admin',
      // })
      // console.log(
      //   '🚀 ~ file: auth.controller.ts:35 ~ logout: ~ user.save():',
      //   await user.save(),
      // )
    } catch (error) {
      next(error)
    }
  },

  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.userId as string
      const { name, email, newPassword, currentPassword } = req.body

      // Check if the current password is correct
      const isPasswordCorrect = await UserService.checkPassword(
        id,
        currentPassword,
      )

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid current password' })
      }

      // Update user profile (name and email)
      await UserService.updateUserProfile(id, { name, email })

      // If a new password is provided, update the password
      if (newPassword) {
        await UserService.updateUserPassword(id, newPassword)
      }

      res.json({ message: 'Profile updated successfully' })
    } catch (error) {
      next(error)
    }
  },
}
