async function getMessages(room) {
  try {
    const snapshot = await firestore
      .collection('messages')
      .where('room', '==', room)
      .orderBy('timestamp', 'desc') // Order by timestamp in descending order
      .limit(100)
      .get();

    const messages = [];
    snapshot.forEach(doc => {
      messages.push(doc.data());
    });
    return messages;
  } catch (error) {
    throw error;
  }
}

module.exports = getMessages;
