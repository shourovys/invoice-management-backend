import express from 'express'
import { AuthController } from './auth.controller'
import { isAuthenticated } from './auth.middleware'

const authRoute = express.Router()

authRoute.post('/login', AuthController.login)
authRoute.post('/logout', isAuthenticated, AuthController.logout)

export default authRoute
