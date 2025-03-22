//! ce fichier n'est pas importé dans le projet, il sert juste à tester le code avant de l'ajouter dans le projet



// 'use client';
// import { SocketMessage, SocketUser, OnGoingCall, Participants, PeerData } from "@/types";
// import { useUser } from "@clerk/nextjs";
// import { createContext, use, useCallback, useContext, useEffect, useState } from "react"; //createContext et useContext permettent de créer et d'utiliser un contexte global.
// import { io, Socket } from "socket.io-client"; // Import the Socket type from socket.io-client
// import Peer, { SignalData } from "simple-peer";

// //!création de context :
// interface ISocketContext {
//   onlineUsers: SocketUser[] | null;
//   //sendMessage: (receiverId: string, text: string) => void;
//   //messages: { senderId: string; text: string }[];
//   onGoingCall: OnGoingCall | null;
//   handleCall: (user: SocketUser) => void;
//   localStream: MediaStream | null;
//   handleJoinCall: (onGoingCall: OnGoingCall) => void;
//   peer: PeerData | null;
//   testStream: () => void;

//   handleHangup: (data: {
//     onGoingCall?: OnGoingCall;
//     isEmitHangup?: boolean;
//   }) => void;

//   isCallEnded: boolean;
// }
// export const SocketContext = createContext<ISocketContext | null>(null);

// //!création du provider :
// export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {

//   const [socket, setSocket] = useState<Socket | null>(null)
//   const { user } = useUser(); //? récupération de l'utilisateur connecté avec Clerk

//   const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false); // ? état de la connexion de la socket

//   const [onlineUsers, setOnlineUsers] = useState<SocketUser[]>([]); // ? liste des utilisateurs connectés
//   const [messages, setMessages] = useState<SocketMessage[]>([]);

//   const [onGoingCall, setOnGoingCall] = useState<OnGoingCall | null>(null); // ? état de l'appel en cours
//   const currentSocketUser = onlineUsers?.find(onlineUser => onlineUser.userId === user?.id);//? récupération de l'utilisateur connecté
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null); //? flux média local
//   const [peer, setPeer] = useState<PeerData | null>(null); //? peer
//   const [isCallEnded, setIsCallEnded] = useState(false);
//   const testStream = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     console.log("Devices : ", devices);
//   };

//   //fonction pour récupérer le flux média
//   const getMediaStream = useCallback(async () => {
//     if (localStream) return localStream;
//     console.log(navigator.mediaDevices);

//     try {
//       const devices = await navigator.mediaDevices.enumerateDevices();
//       console.log("Devices:", devices);
//       const videoDevices = devices.filter(
//         (device) => device.kind === "videoinput"
//       );

//       const constraints: MediaStreamConstraints = {
//         audio: true,
//         video: {
//           width: { min: 640, ideal: 1280, max: 1920 },
//           height: { min: 360, ideal: 720, max: 1080 },
//           frameRate: { min: 30, ideal: 30, max: 30 },
//           facingMode: videoDevices.length > 0 ? "user" : undefined,
//         },
//       };

//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       setLocalStream(stream);//? mise à jour du flux média local
//       return stream;
//     } catch (error) {
//       console.log('Failed to get the stream ', error);
//       setLocalStream(null);
//       return null;
//     }
//   }, [localStream])

//   //fonction pour appeler un utilisateur
//   const handleCall = useCallback(async (user: SocketUser) => {
//     setIsCallEnded(false);
//     if (!currentSocketUser || !socket) return;
//     const stream = await getMediaStream(); //fonction pour récupérer le flux média
//     if (!stream) {
//       console.log("no stream in handle call")
//       return
//     };
//     const participants = { caller: currentSocketUser, receiver: user };
//     setOnGoingCall({
//       participants,
//       isRinging: false
//     });
//     socket.emit("call", participants);
//   }, [socket, onGoingCall, currentSocketUser]);

//   //fonction pour gérer les appels entrants
//   const onIncomingCall = useCallback((participants: Participants) => {
//     setOnGoingCall({
//       participants,
//       isRinging: true
//     })
//   }, [socket, onGoingCall, user]);

//   const handleHangup = useCallback(
//     (data: { onGoingCall?: OnGoingCall | null; isEmitHangup?: boolean }) => {
//       if (socket && user && data?.onGoingCall && data?.isEmitHangup) {
//         socket.emit("hangup", {
//           onGoingCall: data.onGoingCall,
//           userHangingupId: user.id,
//         });
//       }

//       setOnGoingCall(null);
//       setPeer(null);
//       if (localStream) {
//         localStream.getTracks().forEach((track) => track.stop());
//         setLocalStream(null);
//       }
//       setIsCallEnded(true);
//     },
//     [socket, user, localStream]
//   );

//   const createPeer = useCallback((stream: MediaStream, initiator: boolean) => {
//     const iceServers: RTCIceServer[] = [
//       {
//         urls: [
//           "stun:stun.l.google.com:19302",
//           "stun:stun1.l.google.com:19302",
//           "stun:stun2.l.google.com:19302",
//           "stun:stun3.l.google.com:19302",
//         ]
//       }
//     ]

//     const peer = new Peer({
//       stream,
//       initiator,
//       trickle: true,
//       config: { iceServers },
//     });

//     peer.on("stream", (stream) => {
//       setPeer((prevPeer) => {
//         if (prevPeer) {
//           return { ...prevPeer, stream };
//         }
//         return prevPeer;
//       });
//     });

//     peer.on("error", console.error);
//     peer.on("close", () => handleHangup({}));

//     const rtcPeerConnection: RTCPeerConnection = (peer as any)._pc;
//     rtcPeerConnection.oniceconnectionstatechange = async () => {
//       if (
//         rtcPeerConnection.iceConnectionState === "disconnected" ||
//         rtcPeerConnection.iceConnectionState === "failed"
//       ) {
//         handleHangup({});
//       }
//     };

//     return peer;
//   }, [onGoingCall, setPeer])


//   const handleJoinCall = useCallback(async (onGoingCall: OnGoingCall) => {
//     setIsCallEnded(false);
//     setOnGoingCall(prev => {
//       if (prev) {//? si un appel est en cours
//         return { ...prev, isRinging: false }
//       }
//       return prev;
//     })
//     const stream = await getMediaStream();
//     if (!stream) {
//       console.log("no stream in handle join call")
//       return;
//     }
//     const newPeer = createPeer(stream, true);
//     setPeer({
//       peerConnection: newPeer,
//       participantUser: onGoingCall.participants.caller,
//       stream: undefined,
//     })

//     newPeer.on('signal', async (data: SignalData) => {
//       if (socket) {
//         console.log('receiver emitting offer')
//         socket.emit('webrtcSignal', {
//           sdp: data,
//           onGoingCall,
//           isCaller: false,
//         })
//       }
//     })
//   }, [socket, currentSocketUser])

//   const completePeerConnection = useCallback(async (connectionData: { sdp: SignalData, onGoingCall: OnGoingCall, isCaller: boolean }) => {
//     if (!localStream) {
//       console.log('no local stream')
//       return;
//     }

//     if (peer) {
//       peer.peerConnection?.signal(connectionData.sdp);
//       return;
//     }

//     const newPeer = createPeer(localStream, true);
//     setPeer({
//       peerConnection: newPeer,
//       participantUser: connectionData.onGoingCall.participants.receiver,
//       stream: undefined,
//     })

//     newPeer.on('signal', async (data: SignalData) => {
//       if (socket) {
//         console.log('caller emitting offer')
//         socket.emit('webrtcSignal', {
//           sdp: data,
//           onGoingCall,
//           isCaller: true
//         })
//       }
//     })


//   }, [localStream, createPeer, peer, onGoingCall])

//   //initialisation de la socket
//   useEffect(() => {
//     if (!user) return;
//     const newSocket = io() //création de la socket
//     setSocket(newSocket); //mise à jour de la socket
//     return () => {
//       newSocket.disconnect(); // fermeture de la socket
//     };//fonction de nettoyage
//   }, [user]);//exécutée à chaque changement de l'utilisateur

//   //connexion à la socket
//   useEffect(() => {
//     if (!socket) return; //si la socket est null, on fait rien
//     if (socket.connected) {
//       onConnect();
//     }
//     function onConnect() {
//       setIsSocketConnected(true);
//     }
//     function onDisconnect() {
//       setIsSocketConnected(false);
//     }

//     socket.on("connect", onConnect);
//     socket.on("disconnect", onDisconnect);
//     return () => {
//       socket.off("connect", onConnect);
//       socket.off("disconnect", onDisconnect);
//     }
//   }, [socket]);//exécutée à chaque changement de la socket

//   //récupération des utilisateurs connect
//   useEffect(() => {
//     if (!socket || !isSocketConnected) return;
//     socket.emit("addNewUser", user);
//     socket.on("getUsers", (res) => {
//       setOnlineUsers(res);
//     });
//     socket.on("receiveMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => {
//       socket.off("getUsers", (res) => {
//         setOnlineUsers(res);
//       });
//       socket.off("receiveMessage", (res) => {
//         setOnlineUsers(res);
//       });
//     }
//   }, [socket, isSocketConnected, user])

//   //calls
//   useEffect(() => {
//     if (!socket || !isSocketConnected) return;
//     socket.on("incomingCall", onIncomingCall);
//     socket.on("webrtcSignal", completePeerConnection);
//     socket.on("hangup", handleHangup);
//     return () => {
//       socket.off("incomingCall", onIncomingCall);
//       socket.off("webrtcSignal", completePeerConnection);
//       socket.off("hangup", handleHangup);
//     }
//   }, [socket, isSocketConnected, user, onIncomingCall, completePeerConnection])

//   useEffect(() => {
//     let timeout: ReturnType<typeof setTimeout>;
//     if (isCallEnded) {
//       timeout = setTimeout(() => {
//         setIsCallEnded(false);
//       }, 2000);
//     }
//     return () => clearTimeout(timeout);
//   }, [isCallEnded]);

//   // const sendMessage = (receiverId: string, text: string) => {
//   //   socket?.emit("sendMessage", { senderId: user?.id, receiverId, text });
//   // };

//   return (
//     <SocketContext.Provider value={{ onlineUsers, /*sendMessage,*/ /*messages,*/ onGoingCall, handleCall, localStream, handleJoinCall, peer, handleHangup, isCallEnded, testStream }}>
//       {children}
//     </SocketContext.Provider>
//   );
// }

// //!création du hook :
// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (context === null) {
//     throw new Error("useSocket must be used within a SocketContextProvider");
//   }
//   return context;
// }




"use client";
import { OnGoingCall, Participants, PeerData, SocketMessage, SocketUser } from "@/types";
import { useUser } from "@clerk/nextjs";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import Peer, { SignalData } from "simple-peer";

interface iSocketContext {
  onlineUsers: SocketUser[] | null;
  ongoingCall: OnGoingCall | null;
  localStream: MediaStream | null;
  handleCall: (user: SocketUser) => void;
  handleJoinCall: (ongoinCall: OnGoingCall) => void;
  peer: PeerData | null;
  testStream: () => void;

  handleHangup: (data: {
    ongoingCall?: OnGoingCall;
    isEmitHangup?: boolean;
  }) => void;

  isCallEnded: boolean;
  sendMessage: (receiverId: string, text: string) => void;
  messages: { senderId: string; text: string }[];
}

export const SocketContext = createContext<iSocketContext | null>(null);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();

  // Déclaration des états du contexte
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[] | null>([]);
  const [ongoingCall, setOngoingCall] = useState<OnGoingCall | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<PeerData | null>(null);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [messages, setMessages] = useState<SocketMessage[]>([]);

  const currentSocketUser = onlineUsers?.find(
    (onlineUser) => onlineUser.userId === user?.id
  );

  const testStream = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log("Devices : ", devices);
  };
  const getMediaStream = useCallback(async () => {
    if (localStream) return localStream;
    console.log(navigator.mediaDevices);

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log("Devices:", devices);
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      const constraints: MediaStreamConstraints = {
        audio: true,
        video: {
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 360, ideal: 720, max: 1080 },
          frameRate: { min: 30, ideal: 30, max: 30 },
          facingMode: videoDevices.length >= 1 ? "user" : undefined,
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      setLocalStream(stream);
      return stream;
    } catch (error) {
      console.error("Error accessing media devices.", error);
      setLocalStream(null);
      return null;
    }
  }, [localStream]);

  const handleCall = useCallback(
    async (user: SocketUser) => {
      setIsCallEnded(false);
      if (!currentSocketUser || !socket) return;

      const stream = await getMediaStream();

      if (!stream) {
        console.log("No stream in HandleCall");
        return;
      }

      const participants = {
        caller: currentSocketUser,
        receiver: user,
      };

      setOngoingCall({ participants, isRinging: false });

      socket.emit("call", participants);
    },
    [socket, currentSocketUser, ongoingCall]
  );

  const onIncomingCall = useCallback(
    (participants: Participants) => {
      setOngoingCall({ participants, isRinging: true });
    },
    [socket, user, ongoingCall]
  );

  const handleHangup = useCallback(
    (data: { ongoingCall?: OnGoingCall | null; isEmitHangup?: boolean }) => {
      if (socket && user && data?.ongoingCall && data?.isEmitHangup) {
        socket.emit("hangup", {
          ongoingCall: data.ongoingCall,
          userHangingupId: user.id,
        });
      }

      setOngoingCall(null);
      setPeer(null);
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        setLocalStream(null);
      }
      setIsCallEnded(true);
    },
    [socket, user, localStream]
  );

  const createPeer = useCallback(
    (stream: MediaStream, initiator: boolean) => {
      const iceServers: RTCIceServer[] = [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
          ],
        },
      ];

      const peer = new Peer({
        stream,
        initiator,
        trickle: true,
        config: { iceServers },
      });

      peer.on("stream", (stream) => {
        setPeer((prevPeer) => {
          if (prevPeer) {
            return { ...prevPeer, stream };
          }
          return prevPeer;
        });
      });

      peer.on("error", console.error);
      peer.on("close", () => handleHangup({}));

      const rtcPeerConnection: RTCPeerConnection = (peer as any)._pc;
      rtcPeerConnection.oniceconnectionstatechange = async () => {
        if (
          rtcPeerConnection.iceConnectionState === "disconnected" ||
          rtcPeerConnection.iceConnectionState === "failed"
        ) {
          handleHangup({});
        }
      };

      return peer;
    },

    [ongoingCall, setPeer]
  );

  const handleJoinCall = useCallback(
    async (ongoingCall: OnGoingCall) => {
      setIsCallEnded(false);
      setOngoingCall((prev) => {
        if (prev) {
          return { ...prev, isRinging: false };
        }
        return prev;
      });
      const stream = await getMediaStream();
      if (!stream) {
        console.log("Could not get stream in handleJoinCall");
        return;
      }

      const newPeer = createPeer(stream, true);
      setPeer({
        peerConnection: newPeer,
        participantUser: ongoingCall.participants.caller,
        stream: undefined,
      });

      newPeer.on("signal", async (data: SignalData) => {
        if (socket) {
          socket.emit("webrtcSignal", {
            sdp: data,
            ongoingCall,
            isCaller: false,
          });
        }
      });
    },
    [socket, currentSocketUser]
  );

  const completePeerConnection = useCallback(
    async (connectionData: {
      sdp: SignalData;
      ongoingCall: OnGoingCall;
      isCaller: boolean;
    }) => {
      if (!localStream) {
        console.log("Missing the localStream");
        return;
      }
      if (peer) {
        peer.peerConnection?.signal(connectionData.sdp);
        return;
      }

      const newPeer = createPeer(localStream, true);
      setPeer({
        peerConnection: newPeer,
        participantUser: connectionData.ongoingCall.participants.receiver,
        stream: undefined,
      });

      newPeer.on("signal", async (data: SignalData) => {
        if (socket) {
          socket.emit("webrtcSignal", {
            sdp: data,
            ongoingCall,
            isCaller: true,
          });
        }
      });
    },
    [localStream, createPeer, peer, ongoingCall]
  );

  const sendMessage = useCallback((receiverId: string, text: string) => {
    socket?.emit("sendMessage", { senderId: user?.id, receiverId, text });
  }, [socket, user]);

  useEffect(() => {
    if (!socket || !isSocketConnected) return;
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off("receiveMessage", (res) => {
        setOnlineUsers(res);
      });
    }
  }, [socket, isSocketConnected, user]);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!socket) return;
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsSocketConnected(true);
    }
    function onDisconnect() {
      setIsSocketConnected(false);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !isSocketConnected) return;
    socket.emit("addNewUser", user);
    socket.on("getUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getUsers", (res) => {
        setOnlineUsers(res);
      });
    };
  }, [socket, isSocketConnected, user]);

  useEffect(() => {
    if (!socket || !isSocketConnected) return;
    socket.on("incomingCall", onIncomingCall);
    socket.on("webrtcSignal", completePeerConnection);
    socket.on("hangup", handleHangup);
    return () => {
      socket.off("incomingCall", onIncomingCall);
      socket.off("webrtcSignal", completePeerConnection);
      socket.off("hangup", handleHangup);
    };
  }, [socket, isSocketConnected, user, onIncomingCall, completePeerConnection]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isCallEnded) {
      timeout = setTimeout(() => {
        setIsCallEnded(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isCallEnded]);

  return (
    <SocketContext.Provider
      value={{
        onlineUsers,
        handleCall,
        ongoingCall,
        localStream,
        handleJoinCall,
        peer,
        handleHangup,
        isCallEnded,
        testStream,
        sendMessage,
        messages
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketContextProvider");
  }
  return context;
};