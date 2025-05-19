import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface iVideoContainer {
  stream: MediaStream | null;
  isLocalStream: boolean;
  isOnCall: boolean;
  isChatOpen?: boolean;
}

const VideoContainer = ({
  stream,
  isLocalStream,
  isOnCall,
  isChatOpen,
}: iVideoContainer) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <video
      ref={videoRef}
      className={cn("rounded border-slate-400 border-2 w-[1200px]", isLocalStream && isOnCall && "md:w-[300px] w-[200px] h-auto rounded absolute top-2 left-2", isChatOpen && !isLocalStream && !isOnCall && "w-[1500px]")}
      autoPlay
      muted={isLocalStream}
      playsInline
    ></video>
  );
};

export default VideoContainer;