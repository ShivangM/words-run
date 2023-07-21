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
socket.on('createRoom' , ({roomId,name,image})=>{
  const roomId = generateRoomCode();
// If the room doesn't exist, create it and add the creator to it
 if(!rooms[roomId]){
   rooms[roomName] = []; // Create an empty array for the new room
   socket.join(roomId);
   console.log(`Room ${roomId} created by ${socket.id}`);

    // Create a user object with socket ID, name, and image
    const user = { id: socket.id, name, image };

    // Add user to the list of active users in the room
    rooms.roomId.push(user);

    // Emit the list of active users in the room to all users in the room
    io.to(roomId).emit('activeUsers', rooms[roomId]);
 }
 else{ 
  // Room with this ID already exists
  socket.emit('roomError', 'Room with this ID already exists');
 }
});

//Handle Joining a Room 
socket.on('joinRoom', ({roomId,name,image}) => {
  if (!rooms[roomId]) {
    // Room with this ID does not exist
    socket.emit('roomError', 'Room with this ID does not exist');
  } else if (rooms[roomId].length >= 6) {
    // Room is already full (limit of 6 participants)
    socket.emit('roomError', 'Room is already full (limit of 6 participants)');
  } else {
    // Add the participant to the room
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);

    // Create a user object with socket ID, name, and image
    const user = {id:socket.id,name ,image};

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

    // Handle typing speed updates
  socket.on('typingSpeedUpdate', (data) => {
    const { roomId, speed } = data;
    // Broadcast the typing speed to all other users in the same room
    io.to(roomId).emit('typingSpeedUpdate', { userId: socket.id, speed });
  });


 // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User with ID ${socket.id} disconnected`);

// Remove the user from the list of active users in the room upon disconnection
for (const roomName in rooms) {
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
   socket.on("getActiveUsers",(roomId)=>{
   // Send the list of active users in the requested room back to the client
   if (rooms[roomId]) {
      io.to(socket.id).emit('activeUsers', rooms[roomId]);
    } else {
      io.to(socket.id).emit('activeUsers', []);
    }
   });




  });
};
