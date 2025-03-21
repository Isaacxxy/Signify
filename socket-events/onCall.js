import { io } from '../server.js';

export default async function onCall(participants) {
  if (participants.receiver.socketId) {
    io.to(participants.receiver.socketId).emit('incomingCall', participants);
  }
}
