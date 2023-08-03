const generateRoomCode = () => {
  var string = 'abcdefghijklmnopqrstuvwxyz'
  let room = ''

  // Find the length of string
  var len = string.length
  for (let i = 1; i <= 9; i++) {
    room += string[Math.floor(Math.random() * len)]
    if (i % 3 === 0 && i < 9) room += '-'
  }
  return room
}

export default generateRoomCode
