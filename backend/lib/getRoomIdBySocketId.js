const findRoomIdBySocketId = async (socketId, db) => {
  try {
    // Query the Firestore database for rooms containing the given socketId in their 'users' collection
    const querySnapshot = await db
      .collectionGroup('users')
      .where('socketId', '==', socketId)
      .get();

    let roomId = null;
    await querySnapshot.forEach((doc) => {
      roomId = doc.id;
    });

    return roomId;
  } catch (error) {
    console.error(error);
    return null; // Return null if an error occurs or if the roomId is not found
  }
};

module.exports = findRoomIdBySocketId;
