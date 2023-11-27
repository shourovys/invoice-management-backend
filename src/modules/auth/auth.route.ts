import express from 'express'
import { AuthController } from './auth.controller'

const authRoute = express.Router()

authRoute.post('/login', AuthController.login)
authRoute.post('/logout', AuthController.logout)

export default authRoute
