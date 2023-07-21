const { default: generateRoomCode } = require('./utils/generateRoomCode');

module.exports = function Socket(io) {
  io.on('connection', (socket) => {
    const id = socket.id;
    socket.join(id);
    console.log('SOMEONE JOINED ' + id);
    socket.on(
      'send-message',
      ({ recipients, type, content, createdAt, roomId, sender }) => {}
    );

    const rooms = {}; //object to store active users in every room

    //Handle room creation
    socket.on('createRoom', ({ name, image }) => {
      const roomId = generateRoomCode();
      // If the room doesn't exist, create it and add the creator to it
      if (!rooms[roomId]) {
        rooms[roomId] = []; // Create an empty array for the new room
        socket.join(roomId);
        console.log(`Room ${roomId} created by ${socket.id}`);

        // Create a user object with socket ID, name, and image
        const user = { id: socket.id, name, image };

        // Add user to the list of active users in the room
        rooms.roomId.push(user);

        socket.emit('roomCreated', roomId);
        // Emit the list of active users in the room to all users in the room
        io.to(roomId).emit('activeUsers', rooms[roomId]);
      } else {
        // Room with this ID already exists
        socket.emit('roomError', 'Room with this ID already exists');
      }
    });

    //Handle Joining a Room
    socket.on('joinRoom', ({ roomId, name, image }) => {
      if (!rooms[roomId]) {
        // Room with this ID does not exist
        socket.emit('roomError', 'Room with this ID does not exist');
      } else if (rooms[roomId].length >= 6) {
        // Room is already full (limit of 6 participants)
        socket.emit(
          'roomError',
          'Room is already full (limit of 6 participants)'
        );
      } else {
        // Add the participant to the room
        socket.join(roomId);
        console.log(`${socket.id} joined room ${roomId}`);

        // Create a user object with socket ID, name, and image
        const user = { id: socket.id, name, image };

        // Add user to the list of active users in the room
        rooms.roomId.push(user);

        // Emit the list of active users in the room to all users in the room
        io.to(roomId).emit('activeUsers', rooms[roomId]);
      }
    });

    // Handle progress updates
    socket.on('progressUpdate', (data) => {
      const { roomId, progress } = data;
      // Broadcast the progress to all other users in the same room
      io.to(roomId).emit('progressUpdate', { userId: socket.id, progress });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User with ID ${socket.id} disconnected`);

      // Remove the user from the list of active users in the room upon disconnection
      for (const roomId in rooms) {
        const index = rooms[roomId].findIndex((user) => user.id === socket.id);
        if (index !== -1) {
          rooms[roomId].splice(index, 1);

          // Emit the list of active users in the room to all users in the room
          io.to(roomId).emit('activeUsers', rooms[roomId]);
          break;
        }
      }
    });

    // Handle client's request for active users in a room
    socket.on('getActiveUsers', (roomId) => {
      // Send the list of active users in the requested room back to the client
      if (rooms[roomId]) {
        io.to(socket.id).emit('activeUsers', rooms[roomId]);
      } else {
        io.to(socket.id).emit('activeUsers', []);
      }
    });

    // join online request handle
    
    //first define an array of rooms ,here each room will be an object of 
    //difficulty duration and roomId
    const onlineRooms = [];
    //handle room join request
    socket.on('joinRoom' , ({difficulty,duration,})=>{
       //check if a room with same difficulty and duration exists

       const existingRoom = onlineRooms.find((onlineRooms)=>onlineRooms.difficulty === difficulty && 
       onlineRooms.duration === duration);

       
       if(existingRoom && existingRoom.participants.length<existingRoom.size){
       //if there is an available room with available slots then add the user to it
       existingRoom.participants.push(socket.id);
       socket.join(existingRoom.id);
       io.to(existingRoom.id).emit('roomJoined', { room: existingRoom });
       }
       else{
       //if there is no available room with available slots ,create a new room
       const newRoom={
        id : socket.id ,
        difficulty,
        duration,
        size :6,
        participants : [socket.id],
       }

       rooms.push(newRoom);
       socket.join(newRoom.id); // Join the new room on the socket.io level
       io.to(newRoom.id).emit('roomJoined', { room: newRoom });
       }

    });

    //handle disconnection 
    socket.on('disconnect', () => {
      console.log('User disconnected');
      // Remove the disconnected user from all rooms
      rooms.forEach((room) => {
        room.participants = room.participants.filter((participant) => participant !== socket.id);
      });
    });
  });
  
};
