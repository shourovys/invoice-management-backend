// src/modules/user/user.controller.ts
import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'

export const UserController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAllUsers()
      res.json(users)
    } catch (error) {
      next(error)
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await UserService.createUser(req.body)
      res.status(201).json(newUser)
    } catch (error) {
      next(error)
    }
  },

  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserService.getUserById(req.params.userId)
      res.json(user)
    } catch (error) {
      next(error)
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await UserService.updateUser(
        req.params.userId,
        req.body,
      )
      res.json(updatedUser)
    } catch (error) {
      next(error)
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserService.deleteUser(req.params.userId)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  },
}
