import { io, ongoingCalls } from "../server.js";

export default async function onCall(participants) {
  const { caller, receiver } = participants;

  // Vérifier si l'utilisateur appelé est déjà en communication
  if (ongoingCalls.has(receiver.userId)) {
    io.to(caller.socketId).emit("userBusy", {
      message: "L'utilisateur est déjà en communication.",
    });
    return;
  }

  //Sinon ajouter les participants à la liste des appels en cours et lancer l'appel
  ongoingCalls.set(caller.userId, receiver.userId);
  ongoingCalls.set(receiver.userId, caller.userId);

  if (participants.receiver.socketId) {
    io.to(participants.receiver.socketId).emit("incomingCall", participants);
  }
}
