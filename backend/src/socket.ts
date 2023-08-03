import { Server } from 'socket.io'
import { Progress, Room, RoomStatus } from './types/room'
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './types/socket'
import generateRoomCode from '../utils/generateRoomCode'
import getDuration from '../utils/getDuration'

const Socket = (io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
  const rooms: Map<string, Room> = new Map()

  io.on('connection', (socket) => {
    const id = socket.id
    socket.join(id)
    console.log('SOMEONE JOINED ' + id)

    //Handle room creation
    socket.on('createRoom', (user, settings, callback) => {
      let roomId = generateRoomCode()

      //Creates a new room code if the generated one already exists
      while (rooms.has(roomId)) {
        roomId = generateRoomCode()
      }

      const room: Room = {
        owner: user,
        roomId: roomId,
        users: [user],
        usersProgress: [
          {
            key: user.socketId!,
            value: {
              wpm: 0,
              accuracy: 0,
              correctWordsArray: [],
              incorrectWordsArray: []
            }
          }
        ],
        gameSettings: settings,
        status: RoomStatus.WAITING,
        createdAt: new Date(),
        paragraph: '',
        timer: 0
      }

      socket.join(roomId)
      console.log(`Room ${roomId} created by ${socket.id}`)

      rooms.set(roomId, room)

      callback({
        success: true,
        data: room
      })
    })

    socket.on('joinRoom', (roomId, user, callback) => {
      if (rooms.has(roomId)) {
        const room = rooms.get(roomId)!
        if (room.users.length >= 6) {
          // Room is already full (limit of 6 participants)
          callback({
            success: false,
            error: new Error('Room is already full (limit of 6 participants)')
          })
        } else {
          if (!room.users.some((u) => u.socketId === socket.id)) {
            room.users.push(user)
            rooms.set(roomId, room)
            socket.join(roomId)

            io.to(roomId).emit('updateRoom', room)
            console.log(`${socket.id} joined room ${roomId}`)
          }
        }
      } else {
        // Room with this ID does not exist
        callback({
          success: false,
          error: new Error('Room with this ID does not exist')
        })
      }
    })

    socket.on('exitRoom', (roomId, callback) => {
      if (rooms.has(roomId)) {
        const room = rooms.get(roomId)!
        const updatedUsers = room.users.filter((u) => u.socketId !== socket.id)
        room.users = updatedUsers
        socket.leave(roomId)

        // If the owner of the room disconnects, delete the room
        if (room.owner.socketId === socket.id) {
          rooms.delete(roomId)
          console.log(`Room ${roomId} deleted because the owner (${socket.id}) disconnected.`)
        } else {
          // If the room is empty after the user left, delete it
          if (room.users.length === 0) {
            rooms.delete(roomId)
            console.log(`Room ${roomId} deleted because it became empty.`)
          } else {
            rooms.set(roomId, room)
            io.to(roomId).emit('updateRoom', room) // Emit the updated room data to clients
          }
        }

        console.log(`${socket.id} left room ${roomId}`)
      } else {
        // Room with this ID does not exist
        callback({
          success: false,
          error: new Error('Room with this ID does not exist')
        })
      }
    })

    socket.on('startGame', (roomId, paragraph, callback) => {
      if (rooms.has(roomId)) {
        const room = rooms.get(roomId)!
        room.paragraph = paragraph
        room.status = RoomStatus.PLAYING
        room.timer = getDuration(room.gameSettings.duration)
        console.log(`Room ${roomId} game started`)

        const timer = (seconds: number, cb: (remaningTime: number) => void) => {
          setTimeout(function () {
            cb(seconds)
            if (seconds > 0) {
              timer(seconds - 1, cb)
            }
          }, 1000)
        }

        var cb = function (remaningTime: number) {
          room.timer = remaningTime
          rooms.set(roomId, room)
          io.to(roomId).emit('updateRoom', room)

          if (remaningTime === 0) {
            console.log(`Room ${roomId} game ended`)
            room.status = RoomStatus.FINISHED
            rooms.set(roomId, room)
            io.to(roomId).emit('updateRoom', room)
          }
        }

        timer(getDuration(room.gameSettings.duration), cb)
      } else {
        // Room with this ID does not exist
        callback({
          success: false,
          error: new Error('Room with this ID does not exist')
        })
      }
    })

    socket.on('gameStatusUpdate', (roomId, status, callback) => {
      if (rooms.has(roomId)) {
        const room = rooms.get(roomId)!
        room.status = status
        rooms.set(roomId, room)
        io.to(roomId).emit('updateRoom', room)
        console.log(`Room ${roomId} game status changed to ${status}`)
      } else {
        // Room with this ID does not exist
        callback({
          success: false,
          error: new Error('Room with this ID does not exist')
        })
      }
    })

    // Handle progress updates
    socket.on('userProgressUpdate', (roomId, socketId, progress) => {
      if (rooms.has(roomId)) {
        const room = rooms.get(roomId)!
        const userProgressIdx = room.usersProgress.findIndex((u) => u.key === socketId)
        if (userProgressIdx === -1) {
          // User progress not found, add it
          room.usersProgress.push({
            key: socketId,
            value: progress
          })
        } else {
          // User progress found, update it
          room.usersProgress[userProgressIdx].value = progress
        }

        room.usersProgress.sort((a, b) => {
          return b.value.accuracy - a.value.accuracy
        })

        rooms.set(roomId, room)
        io.to(roomId).emit('updateRoom', room)
        // console.log(`Room ${roomId} progress updated for ${socketId}`)
      }
    })

    const handleDisconnect = (socketId: string) => {
      for (const [roomId, room] of rooms.entries()) {
        const updatedUsers = room.users.filter((u) => u.socketId !== socketId)
        if (updatedUsers.length < room.users.length) {
          // The user was found in the room and removed
          room.users = updatedUsers

          // If the owner of the room disconnects, delete the room
          if (room.owner.socketId === socketId) {
            rooms.delete(roomId)
            console.log(`Room ${roomId} deleted because the owner (${socketId}) disconnected.`)
          } else {
            // If the room is empty after the user left, delete it
            if (room.users.length === 0) {
              rooms.delete(roomId)
              console.log(`Room ${roomId} deleted because it became empty.`)
            } else {
              rooms.set(roomId, room)
              io.to(roomId).emit('updateRoom', room) // Emit the updated room data to clients
            }
          }

          console.log(`${socketId} left room ${roomId}`)
          break // Stop the loop as we found the room and handled the disconnection
        }
      }
    }

    socket.on('disconnect', () => {
      handleDisconnect(socket.id)
    })
  })
}

export default Socket
