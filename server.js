// // ! Ce code configure et démarre un serveur HTTP avec une application Next.js et intègre Socket.io pour gérer les connexions WebSocket.

// import { createServer } from "node:http";
// import next from "next";
// import { Server } from "socket.io";
// import onCall from "./socket-events/onCall.js";
// import onWebrtcSignal from "./socket-events/onWebrtcSignal.js";
// import onHangup from "./socket-events/onHangup.js";


// const dev = process.env.NODE_ENV !== "production";//détection du mode de développement pas de production
// const hostname = "localhost";
// const port = 3000;

// // when using middleware `hostname` and `port` must be provided below
// const app = next({ dev, hostname, port }); //création d'une instance de Next.js
// const handler = app.getRequestHandler(); //récupération du gestionnaire de requêtes

// console.log("Starting server...");
// export let io;

// app.prepare().then(() => {
//   const httpServer = createServer(handler); //création de serveur

//   io = new Server(httpServer); //Initialisation de Socket.io
//   let onlineUsers = [];

//   io.on("connection", (socket) => {
//     //add user to online users
//     socket.on("addNewUser", (clerkUser) => {
//       clerkUser && !onlineUsers.some((user) => user.id === clerkUser.id) && onlineUsers.push({
//         userId: clerkUser.id,
//         socketId: socket.id,
//         profile: clerkUser,
//       });//? ajoute un nouvel utilisateur à la liste des utilisateurs connectés
//       io.emit("getUsers", onlineUsers);//? envoie la liste des utilisateurs connectés
//     });
//     //disconnect user
//     socket.on("disconnect", () => {
//       onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);//? supprime l'utilisateur déconnecté
//       io.emit("getUsers", onlineUsers);//? envoie la liste des utilisateurs connectés
//     });
//     //send message to user
//     socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//       const receiver = onlineUsers.find((user) => user.userId === receiverId);
//       if (receiver) {
//         io.to(receiver.socketId).emit("receiveMessage", {
//           senderId,
//           text,
//         });
//       }
//     });
//     //call user
//     socket.on("call", onCall);
//     socket.on("webrtcSignal", onWebrtcSignal);
//     socket.on("hangup", onHangup);
//   });//Gestion de la connexion d'un client

//   httpServer
//     .once("error", (err) => {
//       console.error(err);
//       process.exit(1);
//     })
//     .listen(port, () => {
//       console.log(`> Ready on http://${hostname}:${port}`);
//     });
// });

import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import onCall from "./socket-events/onCall.js";
import onWebrtcSignal from "./socket-events/onWebrtcSignal.js";
import onHangup from "./socket-events/onHangup.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

export let io;
app.prepare().then(() => {
  const httpServer = createServer(handler);

  io = new Server(httpServer);
  let onlineUsers = [];

  io.on("connection", (socket) => {
    socket.on("addNewUser", (clerkUser) => {
      clerkUser &&
        !onlineUsers.some((user) => user?.userId === clerkUser.id) &&
        onlineUsers.push({
          userId: clerkUser.id,
          socketId: socket.id,
          profile: clerkUser,
        });
      io.emit("getUsers", onlineUsers);
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      io.emit("getUsers", onlineUsers);
    });

    socket.on("call", onCall);
    socket.on("webrtcSignal", onWebrtcSignal);
    socket.on("hangup", onHangup);
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
