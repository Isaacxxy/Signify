"use client";

import { useSocket } from "@/context/SocketContext";
import VideoContainer from "./VideoContainer";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";
import { useUser } from "@clerk/nextjs"; // Importez useUser pour obtenir l'ID de l'utilisateur actuel

const VideoCall = () => {
  const {
    localStream,
    peer,
    ongoingCall,
    handleHangup,
    isCallEnded,
    sendMessage,
    messages,
  } = useSocket();
  const { user } = useUser(); // Récupérez l'utilisateur actuel
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVidOn, setIsVidOn] = useState(true);
  const [newMessage, setNewMessage] = useState("");

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

  const isOnCall = localStream && peer && ongoingCall ? true : false;

  if (isCallEnded) {
    return <div className="mt-5 text-rose-500 text-center">Call Ended</div>;
  }

  if (!localStream && !peer) return;

  // Déterminer le receiverId de manière simple
  const receiverId =
    ongoingCall?.participants?.caller?.userId === peer?.participantUser?.userId
      ? ongoingCall?.participants?.caller?.userId
      : ongoingCall?.participants?.receiver?.userId;

  const handleSendMessage = () => {
    
    messages.push({ senderId: user?.id || '', text: newMessage });
    if (newMessage.trim() && receiverId) {
      sendMessage(receiverId, newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Section Vidéo */}
      <div className="flex-1">
        <div className="mt-4 relative">
          {localStream && (
            <VideoContainer
              stream={localStream}
              isLocalStream={true}
              isOnCall={isOnCall}
            />
          )}
          {peer && peer.stream && (
            <VideoContainer
              stream={peer.stream}
              isLocalStream={false}
              isOnCall={isOnCall}
            />
          )}
        </div>
        <div className="mt-8 flex item-center justify-center">
          <Button onClick={toggleMic}>
            {isMicOn ? <MdMicOff size={28} /> : <MdMic size={28} />}
          </Button>
          <Button
            className="px-4 py-2 bg-rose-500 text-white rounded mx-4"
            onClick={() =>
              handleHangup({
                ongoingCall: ongoingCall ? ongoingCall : undefined,
                isEmitHangup: true,
              })
            }
          >
            End call
          </Button>
          <Button onClick={toggleCamera}>
            {isVidOn ? <MdVideocamOff size={28} /> : <MdVideocam size={28} />}
          </Button>
        </div>
      </div>

      {/* Section Chat */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4">
        <div className="h-64 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.senderId === user?.id ? "text-right" : "text-left"
              }`} // Comparez avec user?.id
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.senderId === user?.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300" // Comparez avec user?.id
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 p-2 border rounded-l"
            placeholder="Type a message..."
          />
          <Button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white rounded-r"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
