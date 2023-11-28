// src/modules/user/user.middleware.ts

import { IMiddlewareFunction } from '../../type'
import { UserService } from './user.service'
import { verifyToken } from './user.utils'

// Middleware to check if the user is an admin
export const isAdmin: IMiddlewareFunction = async (req, res, next) => {
  const decodedUserId = await verifyToken(req, res)

  if (decodedUserId) {
    const fetchedUser = await UserService.getUserById(decodedUserId)

    if (fetchedUser && fetchedUser.role !== 'admin') {
      res.status(403).json({ message: 'Forbidden: User is not an admin' })
    } else {
      req.params.userId = decodedUserId
      next()
    }
  }
}

// Middleware to check if the same user is requesting to update their account
export const isSameUser: IMiddlewareFunction = async (req, res, next) => {
  const decodedUserId = await verifyToken(req, res)
  if (decodedUserId) {
    const fetchedUser = await UserService.getUserById(decodedUserId)

    if (!fetchedUser) {
      res.status(403).json({
        message: 'Forbidden: User is not authorized to perform this action',
      })
    } else {
      req.params.userId = decodedUserId
      next()
    }
  }
}

// Middleware to check if the JWT token user is an admin or the same user
export const isAdminOrSameUser: IMiddlewareFunction = async (
  req,
  res,
  next,
) => {
  const decodedUserId = await verifyToken(req, res)

  if (decodedUserId) {
    const fetchedUser = await UserService.getUserById(decodedUserId)

    if ((fetchedUser && fetchedUser.role === 'admin') || decodedUserId) {
      req.params.userId = decodedUserId
      next()
    } else {
      res.status(403).json({
        message: 'Forbidden: User is not authorized to perform this action',
      })
    }
  }
}
