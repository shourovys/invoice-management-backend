// src/modules/auth/auth.middleware.ts

import { IMiddlewareFunction } from '../../type'
import { verifyToken } from '../user/user.utils'

// Middleware to check if the user is authenticated
export const isAuthenticated: IMiddlewareFunction = async (req, res, next) => {
  const decodedUserId = await verifyToken(req, res)

  if (decodedUserId) {
    // req.user = { id: decodedUserId } as { id: string }
    next()
  }
}
