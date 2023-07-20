module.exports = function Socket(io) {
  io.on('connection', (socket) => {
    const id = socket.id;
    socket.join(id);
    console.log('SOMEONE JOINED ' + id);
    socket.on(
      'send-message',
      ({ recipients, type, content, createdAt, roomId, sender }) => {}
    );

    // socket.on("disconn")
  });
};
