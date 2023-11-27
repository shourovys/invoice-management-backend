import mongoose from 'mongoose'
import app from './app'
import { DATABASE_URL, PORT } from './config'

async function main() {
  try {
    // MongoDB connection
    mongoose.connect(DATABASE_URL)

    console.log('Database successful connected')

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.log('🚀 ~ file: server.ts:18 ~ main ~ error:', error)
  }
}

main()
