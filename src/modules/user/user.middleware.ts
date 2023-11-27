// src/modules/user/user.middleware.ts

import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'
import { verifyToken } from './user.utils'

// Custom type for middleware functions
type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void

// Utility function to verify and decode JWT token

// Middleware to check if the user is an admin
export const isAdmin: MiddlewareFunction = async (req, res, next) => {
  const decodedUserId = await verifyToken(req, res)

  if (decodedUserId) {
    const fetchedUser = await UserService.getUserById(decodedUserId)

    if (fetchedUser && fetchedUser.role !== 'admin') {
      res.status(403).json({ message: 'Forbidden: User is not an admin' })
    } else {
      // req.user = { id: decodedUserId } as { id: string }
      next()
    }
  }
}

// Middleware to check if the same user is requesting to update their account
export const isSameUser: MiddlewareFunction = async (req, res, next) => {
  const decodedUserId = await verifyToken(req, res)

  if (decodedUserId && decodedUserId !== req.params.userId) {
    res.status(403).json({
      message: 'Forbidden: User is not authorized to perform this action',
    })
  } else {
    // req.user = { id: decodedUserId } as { id: string }
    next()
  }
}

// Middleware to check if the JWT token user is an admin or the same user
export const isAdminOrSameUser: MiddlewareFunction = async (req, res, next) => {
  const decodedUserId = await verifyToken(req, res)

  if (decodedUserId) {
    const fetchedUser = await UserService.getUserById(decodedUserId)

    if (
      (fetchedUser && fetchedUser.role !== 'admin') ||
      decodedUserId === req.params.userId
    ) {
      next()
    } else {
      res.status(403).json({
        message: 'Forbidden: User is not authorized to perform this action',
      })
    }
  }
}

// Middleware to check if the user is authenticated
export const isAuthenticated: MiddlewareFunction = async (req, res, next) => {
  const decodedUserId = await verifyToken(req, res)

  if (decodedUserId) {
    // req.user = { id: decodedUserId } as { id: string }
    next()
  }
}
