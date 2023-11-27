// src/types/index.ts

import { NextFunction, Request, Response } from 'express'

export interface IUserRequest extends Request {
  user?: {
    id: string
  }
}

// Custom type for middleware functions
export type IMiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void
