import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'

// modules
import authRoute from './modules/auth/auth.route'
import invoiceRouter from './modules/invoice/invoice.route'
import userRouter from './modules/user/user.route'

const app: Application = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())

// parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Invoicing System API')
})

// Use routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRouter)
app.use('/api/invoice', invoiceRouter)

export default app
