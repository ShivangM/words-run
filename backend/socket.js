const findRoomIdBySocketId = require('./lib/getRoomIdBySocketId');
const { db } = require('./utils/firebase');
const { generateRoomCode } = require('./utils/generateRoomCode');

module.exports = function Socket(io) {
  io.on('connection', (socket) => {
    const id = socket.id;
    socket.join(id);
    console.log('SOMEONE JOINED ' + id);

    //Handle room creation
    socket.on('createRoom', async (user) => {
      const roomId = generateRoomCode();
      const existingRoom = await db.collection('rooms').doc(roomId).get();

      if (!existingRoom.exists) {
        await db.collection('rooms').doc(roomId).set({ owner: socket.id });

        console.log(`Room ${roomId} created by ${socket.id}`);
        socket.join(roomId);

        socket.emit('roomCreated', roomId);
      } else {
        // Room with this ID already exists
        socket.emit('roomError', 'Room with this ID already exists');
      }
    });

    // Handle Joining a Room
    socket.on('joinRoom', async ({ roomId, user }) => {
      const existingRoom = await db.collection('rooms').doc(roomId).get();

      if (!existingRoom.exists) {
        // Room with this ID does not exist
        socket.emit('roomError', 'Room with this ID does not exist');
      } else {
        const roomUsersSnapshot = await db
          .collection('rooms')
          .doc(roomId)
          .collection('users')
          .get();

        const roomUsers = roomUsersSnapshot.docs.map((doc) => doc.data());

        if (roomUsers.length >= 6) {
          // Room is already full (limit of 6 participants)
          socket.emit(
            'roomError',
            'Room is already full (limit of 6 participants)'
          );
        } else {
          if (!roomUsers.some((u) => u.socketId === socket.id)) {
            await db
              .collection('rooms')
              .doc(roomId)
              .collection('users')
              .doc(socket.id)
              .set({ socketId: socket.id, ...user });

            socket.join(roomId);
            console.log(`${socket.id} joined room ${roomId}`);
          }

          // Get the updated list of active users in the room
          const updatedUsersSnapshot = await db
            .collection('rooms')
            .doc(roomId)
            .collection('users')
            .get();

          const updatedUsers = updatedUsersSnapshot?.docs?.map((doc) =>
            doc?.data()
          );

          const owner = await (
            await db.collection('rooms').doc(roomId).get()
          ).data().owner;

          // Emit the list of active users in the room to all users in the same room
          io.to(roomId).emit('activeUsers', updatedUsers); // Change to io.to(roomId)
          io.to(roomId).emit('setOwner', owner);
        }
      }
    });

    socket.on('exitRoom', async (roomId) => {
      try {
        await db
          .collection('rooms')
          .doc(roomId)
          .collection('users')
          .doc(socket.id)
          .delete();
      } catch (error) {
        console.error(error);
      }

      console.log(`${socket.id} left room ${roomId}`);

      // Get the updated list of active users in the room
      try {
        const roomUsersSnapshot = await db
          .collection('rooms')
          .doc(roomId)
          .collection('users')
          .get();

        const updatedUsers = roomUsersSnapshot.docs.map((doc) => doc.data());

        if (updatedUsers.length === 0) {
          // If there are no users left in the room, delete the entire room
          await db.collection('rooms').doc(roomId).delete();
        } else {
          // If there are still users in the room, emit the updated list of users
          io.to(roomId).emit('activeUsers', updatedUsers);
        }
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('gameStatus', (data) => {
      const { roomId, status, paragraph, timer } = data;
      console.log(`Room ${roomId} game status changed to ${status}`);
      io.to(roomId).emit('gameStatus', { status, paragraph, timer });
    });

    // Handle progress updates
    socket.on('progressUpdate', ({ roomId, progress }) => {
      io.to(roomId).emit('progressUpdate', { socketId: socket.id, progress });
    });

    // // join online request handle
    // const onlineRooms = [];
    // //handle room join request
    // socket.on('joinRoom', ({ difficulty, duration }) => {
    //   //check if a room with same difficulty and duration exists

    //   const existingRoom = onlineRooms.find(
    //     (onlineRooms) =>
    //       onlineRooms.difficulty === difficulty &&
    //       onlineRooms.duration === duration
    //   );

    //   if (
    //     existingRoom &&
    //     existingRoom.participants.length < existingRoom.size
    //   ) {
    //     //if there is an available room with available slots then add the user to it
    //     existingRoom.participants.push(socket.id);
    //     socket.join(existingRoom.id);
    //     io.to(existingRoom.id).emit('roomJoined', { room: existingRoom });
    //   } else {
    //     //if there is no available room with available slots ,create a new room
    //     const newRoom = {
    //       id: socket.id,
    //       difficulty,
    //       duration,
    //       size: 6,
    //       participants: [socket.id],
    //     };

    //     rooms.push(newRoom);
    //     socket.join(newRoom.id); // Join the new room on the socket.io level
    //     io.to(newRoom.id).emit('roomJoined', { room: newRoom });
    //   }
    // });

    const handleDisconnect = async (socketId) => {
      console.log(`User with ID ${socketId} disconnected`);
      const roomId = await findRoomIdBySocketId(socketId, db);

      try {
        await db
          .collection('rooms')
          .doc(roomId)
          .collection('users')
          .doc(socket.id)
          .delete();
      } catch (error) {
        console.error(error);
      }

      console.log(`${socket.id} left room ${roomId}`);

      // Get the updated list of active users in the room
      try {
        const roomUsersSnapshot = await db
          .collection('rooms')
          .doc(roomId)
          .collection('users')
          .get();

        const updatedUsers = roomUsersSnapshot.docs.map((doc) => doc.data());

        if (updatedUsers.length === 0) {
          // If there are no users left in the room, delete the entire room
          await db.collection('rooms').doc(roomId).delete();
        } else {
          // If there are still users in the room, emit the updated list of users
          io.to(roomId).emit('activeUsers', updatedUsers);
        }
      } catch (error) {
        console.error(error);
      }
    };

    socket.on('disconnect', () => {
      handleDisconnect(socket.id);
    });
  });
};
