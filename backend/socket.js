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

    const rooms = [];

    //Handle room creation
    socket.on('createRoom', () => {
      const roomId = generateRoomCode();
      // If the room doesn't exist, create it and add the creator to it
      if (!rooms[roomId]) {
        rooms[roomId] = [socket.id];
        socket.join(roomId);
        console.log(`Room ${roomId} created by ${socket.id}`);
      } else {
        // Room with this ID already exists
        socket.emit('roomError', 'Room with this ID already exists');
      }
    });

    //Handle Joining a Room
    socket.on('joinRoom', (roomId) => {
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
        rooms[roomId].push(socket.id);
        socket.join(roomId);
        console.log(`${socket.id} joined room ${roomId}`);
      }
    });
  });
};
