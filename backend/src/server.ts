import { config } from 'dotenv'
config({ path: '.env' })

process.on('uncaughtException', (error) => {
  // using uncaughtException event
  console.log(' uncaught Exception => shutting down..... ')
  console.log(error.name, error.message)
  process.exit(1) //  emidiatly exists all from all the requests
})

import { Server } from 'socket.io'
import app from './index'
import { createServer } from 'http'
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://words-run.vercel.app'],
    methods: ['GET', 'POST']
  }
})

import Socket from './socket'
Socket(io)

// server
const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`App is running on port ${port}`)
})

// handle Globaly  the unhandle Rejection Error which is  outside the express
// e.g database connection
process.on('unhandledRejection', (error: Error) => {
  // it uses unhandledRejection event
  // using unhandledRejection event
  console.log(' Unhandled Rejection => shutting down..... ')
  console.log(error.name, error.message)
  server.close(() => {
    process.exit(1) //  emidiatly exists all from all the requests sending OR pending
  })
})
