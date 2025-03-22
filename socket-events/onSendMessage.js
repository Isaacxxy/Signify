import { io } from "../server.js";


const onSendMessage = async ({ senderId, receiverId, text }) => {
  const receiver = onlineUsers.find((user) => user.userId === receiverId);
  if (receiver) {
    io.to(receiver.socketId).emit("receiveMessage", {
      senderId,
      text,
    });
  }
};

export default onSendMessage;
