const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

// Function to save a message to Firestore
async function saveMessage(message, username, room, createdTime) {
  try {
    const messageRef = firestore.collection('messages').doc();
    await messageRef.set({
      message: message,
      username: username,
      room: room,
      createdTime: createdTime
    });
    return 'Message saved successfully';
  } catch (error) {
    throw error;
  }
}

// Function to get the last 100 messages from Firestore for a specific room
async function getMessages(room) {
  try {
    const messagesSnapshot = await firestore.collection('messages')
      .where('room', '==', room)
      .orderBy('createdTime', 'desc')
      .limit(100)
      .get();

    const messages = [];
    messagesSnapshot.forEach((doc) => {
      messages.push(doc.data());
    });

    return messages.reverse();
  } catch (error) {
    throw error;
  }
}

module.exports = { saveMessage, getMessages };
