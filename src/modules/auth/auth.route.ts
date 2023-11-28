import express from 'express'
import { AuthController } from './auth.controller'
import { isAuthenticated } from './auth.middleware'

const authRoute = express.Router()

authRoute.post('/login', AuthController.login)
authRoute.get('/logout', isAuthenticated, AuthController.logout)
authRoute.put('/profile', isAuthenticated, AuthController.updateProfile)

export default authRoute
