import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from a .env file
dotenv.config({ path: path.join(process.cwd(), '.env') })

export const PORT = process.env.PORT || 3000
export const DATABASE_URL =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/car_invoicing_system'

export const DEFAULT_AGENT_PASSWORD = process.env.DEFAULT_AGENT_PASSWORD || ''

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || ''
