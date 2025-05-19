"use client";

import { useSocket } from "@/context/SocketContext";
import VideoContainer from "./VideoContainer";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";
import { MdSignLanguage } from "react-icons/md";
import { ImPhoneHangUp } from "react-icons/im";
import { useUser } from "@clerk/nextjs";
import { IoIosChatbubbles } from "react-icons/io";
import { PhoneIncoming } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const VideoCall = () => {
  const {
    localStream,
    peer,
    ongoingCall,
    handleHangup,
    isCallEnded,
    sendMessage,
    messages,
    duration,
  } = useSocket();
  const { user } = useUser(); // Récupérez l'utilisateur actuel
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [isVidOn, setIsVidOn] = useState<boolean>(true);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callParticipants, setCallParticipants] = useState<{
    callerId?: string;
    receiverId?: string;
  }>({});
  const [hasLoggedCall, setHasLoggedCall] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      setIsVidOn(videoTrack.enabled);
      const audioTrack = localStream.getAudioTracks()[0];
      setIsMicOn(audioTrack.enabled);
    }
  }, [localStream]);

  const toggleCamera = useCallback(() => {
    if (localStream && localStream.getVideoTracks().length > 0) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVidOn(videoTrack.enabled);
    }
  }, [localStream]);

  const toggleMic = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  }, [localStream]);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(`Key: ${event.key}, Code: ${event.code}`);

      if (event.altKey) {
        switch (event.key) {
          case "c":
          case "C":
            toggleCamera();
            break;
          case "m":
          case "M":
            toggleMic();
            break;
          case "h":
          case "H":
            handleHangup({
              ongoingCall: ongoingCall ? ongoingCall : undefined,
              isEmitHangup: true,
            });
            break;
          default:
            break;
        }
      } else if (event.ctrlKey) {
        switch (event.key) {
          case "m":
          case "M":
            toggleChat();
            break;
          case "s":
          case "S":
            //toggle sign language
            break;
          default:
            break;
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleCamera, toggleMic]);

  const isOnCall = localStream && peer && ongoingCall ? true : false;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isOnCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }

    return () => clearInterval(interval);
  }, [isOnCall]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    if (ongoingCall && peer) {
      setCallParticipants({
        callerId: ongoingCall.participants.caller?.userId,
        receiverId: ongoingCall.participants.receiver?.userId,
      });
    }
  }, [ongoingCall, peer]);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isCallEnded) {
    console.log("callParticipants >>>>>>>", callParticipants);
    const receiverId = callParticipants.receiverId;
    console.log("user.id >>>>>>>", user?.id);
    console.log("Duration", duration);

    if (
      user?.id &&
      receiverId &&
      duration &&
      callParticipants.callerId &&
      callParticipants.callerId !== user?.id &&
      !hasLoggedCall
    ) {
      setHasLoggedCall(true);
      const formData = new FormData();
      formData.append("callerId", callParticipants.callerId);
      formData.append("receiverId", receiverId);
      formData.append("duration", duration.toString());

      console.log("Envoi des données d'appel...");
      fetch("/api/callsSessions", {
        method: "POST",
        body: formData,
      })
        .then(() => console.log("Call session logged successfully"))
        .catch((err) => {
          console.error("Failed to log call session:", err);
          setHasLoggedCall(false);
        });
    }
    return (
      <div className="absolute bg-zinc-700 w-full bg-opacity-70 h-screen top-0 left-0 flex items-center justify-center">
        <div className="shadow-lg bg-black font-Roboto-light min-w-[300px] win-h-[100px] flex flex-col items-center justify-center mx-4 rounded-xl p-10">
          <p className="text-white text-lg mb-4">Call ended</p>
          <PhoneIncoming size={42} className="text-white mb-2" />
        </div>
      </div>
    );
  }

  if (!localStream && !peer) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] w-[1400px] overflow-hidden relative">
        <div className="flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <Skeleton className="h-32 w-32 rounded-full" />
              <Skeleton className="h-6 w-24 rounded  mt-4" />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={user?.imageUrl}
                alt=""
                className="w-32 h-32 rounded-full"
              />
              <h1 className="text-white text-2xl font-bold mt-4">
                {user?.fullName}
              </h1>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="relative z-10 text-lg md:text-5xl py-3  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
            Signify: Talk Freely, See Clearly
          </h1>
          <p></p>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-lg text-center relative z-10">
            Video Calls & Chat in One Place
          </p>
        </div>
      </div>
    );
  }

  const receiverId =
    ongoingCall?.participants?.caller?.userId === peer?.participantUser?.userId
      ? ongoingCall?.participants?.caller?.userId
      : ongoingCall?.participants?.receiver?.userId;

  console.log("receiverId out of callEnd >>>>", receiverId);

  const handleSendMessage = () => {
    messages.push({ senderId: user?.id || "", text: newMessage });
    if (newMessage.trim() && receiverId) {
      sendMessage(receiverId, newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 h-full w-full max-w-[1400px] mx-auto">
      {/* Section Vidéo */}
      <div
        className={`flex-1 flex flex-col justify-between gap-6 ${
          !isChatOpen && "items-center"
        }`}
      >
        <div className="relative w-full h-auto">
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            {!isOnCall && (
              <div className="text-white text-lg">
                {ongoingCall ? "Connecting..." : "Waiting for a call..."}
              </div>
            )}
          </div>
          {localStream && (
            <VideoContainer
              stream={localStream}
              isLocalStream={true}
              isOnCall={isOnCall}
              isChatOpen={isChatOpen}
            />
          )}
          {peer && peer.stream && (
            <VideoContainer
              stream={peer.stream}
              isLocalStream={false}
              isOnCall={isOnCall}
            />
          )}
          {isOnCall && (
            <div className="absolute top-2 right-2 bg-white bg-opacity-60 text-black px-2 py-1 rounded text-sm z-10">
              {formatTime(callDuration)}
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 w-full md:w-3/4 mx-auto">

          <div className="flex gap-3">
            <Button onClick={toggleMic}>
              {isMicOn ? <MdMicOff size={24} /> : <MdMic size={24} />}
            </Button>
            <Button onClick={toggleCamera}>
              {isVidOn ? <MdVideocamOff size={24} /> : <MdVideocam size={24} />}
            </Button>
            <Button
              className="px-4 py-2 bg-rose-500 text-white rounded-full"
              onClick={() =>
                handleHangup({
                  ongoingCall: ongoingCall ? ongoingCall : undefined,
                  isEmitHangup: true,
                })
              }
            >
              <ImPhoneHangUp />
            </Button>
          </div>

          <Button onClick={toggleChat}>
            <IoIosChatbubbles size={24} />
          </Button>
        </div>
      </div>

      {/* Section Chat */}
      <div
        className={`w-full md:w-1/3 bg-white shadow-xl rounded-2xl p-4 flex flex-col ${
          isChatOpen ? "flex justify-between" : "hidden"
        }`}
      >
        {/* Messages */}
        <div className="h-72 overflow-y-auto mb-4 space-y-4 px-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === user?.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-md ${
                  msg.senderId === user?.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center pt-3 gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm "
            placeholder="Type a message..."
          />
          <Button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-5 py-3 rounded-full hover:bg-blue-700 text-sm"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
