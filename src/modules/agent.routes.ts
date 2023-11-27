import express from 'express'
const router = express.Router()

// Sample route
router.get('/agents', (req, res) => {
  res.send('List of agents')
})

export default router
