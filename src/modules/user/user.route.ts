// src/modules/user/user.route.ts
import express from 'express'
import { UserController } from './user.controller'
import { isAdmin, isAdminOrSameUser } from './user.middleware'

const userRouter = express.Router()

userRouter.get('/', isAdmin, UserController.getAllUsers)
userRouter.post('/', isAdmin, UserController.createUser)
userRouter.get('/:userId', isAdminOrSameUser, UserController.getUserById)
userRouter.put('/:userId', isAdminOrSameUser, UserController.updateUser)
userRouter.delete('/:userId', isAdminOrSameUser, UserController.deleteUser)

export default userRouter
