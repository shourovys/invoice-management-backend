// src/modules/user/user.route.ts
import express from 'express'
import { UserController } from './user.controller'
import { isSameUser } from './user.middleware'

const userRouter = express.Router()

userRouter.get('/', UserController.getAllUsers)
userRouter.post('/', UserController.createUser)
userRouter.get('/config', isSameUser, UserController.getUserById)
userRouter.get('/:userId', UserController.getUserById)
userRouter.put('/:userId', UserController.updateUser)
userRouter.delete('/:userId', UserController.deleteUser)

export default userRouter
