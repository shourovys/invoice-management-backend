// src/modules/auth/auth.controller.ts

import { NextFunction, Request, Response } from 'express'
import { AuthService } from './auth.service'

export const AuthController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await AuthService.login(req.body.email, req.body.password)
      res.json({ token })
    } catch (error) {
      next(error)
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Perform any necessary actions for logout
      res.json({ message: 'Logout successful' })
    } catch (error) {
      next(error)
    }
  },
}
