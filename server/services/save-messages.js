const { Firestore } = require('@google-cloud/firestore');

// Initialize Firestore
const firestore = new Firestore();

async function saveMessage(message, username, room) {
  try {
    await firestore.collection('messages').add({
      message,
      username,
      room,
      timestamp: new Date().toISOString() // Add a timestamp for sorting
    });
    return "Message saved successfully";
  } catch (error) {
    throw error;
  }
}

module.exports = saveMessage;
