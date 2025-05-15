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
  const [isChatOpen, setIsChatOpen] = useState(true);

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
    return <div className="flex justify-center items-center mt-5 text-rose-500 text-center w-full">
      Call Ended
    </div>;
  }

  if (!localStream && !peer) return;

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
    <div className="flex flex-col md:flex-row gap-6 p-4 h-full w-full max-w-[1400px] mx-auto">
      {/* Section Vidéo */}
      <div className={`flex-1 flex flex-col justify-between gap-6 ${!isChatOpen && "items-center"}`}>
        <div className="relative w-full h-auto">
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
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 w-full md:w-3/4 mx-auto">
          <Button className="bg-white text-black rounded-xl">
            <MdSignLanguage />
          </Button>

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

          <Button onClick={() => setIsChatOpen(!isChatOpen)}>
            <IoIosChatbubbles size={24} />
          </Button>
        </div>
      </div>

      {/* Section Chat */}
      <div className={`w-full md:w-1/3 bg-white shadow-xl rounded-2xl p-4 flex flex-col ${isChatOpen ? "flex justify-between" : "hidden"}`}>
        {/* Messages */}
        <div className="h-72 overflow-y-auto mb-4 space-y-4 px-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.senderId === user?.id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-md ${msg.senderId === user?.id
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