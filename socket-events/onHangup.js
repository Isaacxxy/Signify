import { io, ongoingCalls } from "../server.js";

const onHangup = async (data) => {
  const { caller, receiver } = data.ongoingCall.participants;

  // Supprimer les utilisateurs de la liste des appels en cours
  ongoingCalls.delete(caller.userId);
  ongoingCalls.delete(receiver.userId);

  let socketIdToEmitTo;
  if (data.ongoingCall.participants.caller.userId === data.userHangingupId) {
    socketIdToEmitTo = data.ongoingCall.participants.receiver.socketId;
  } else {
    socketIdToEmitTo = data.ongoingCall.participants.caller.socketId;
  }

  if (socketIdToEmitTo) {
    io.to(socketIdToEmitTo).emit("hangup");
  }
};

export default onHangup;
