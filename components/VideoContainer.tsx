import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface iVideoContainer {
  stream: MediaStream | null;
  isLocalStream: boolean;
  isOnCall: boolean;
}

const VideoContainer = ({
  stream,
  isLocalStream,
  isOnCall,
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
      className={cn("rounded border w-[800px]", isLocalStream && isOnCall && "w-[200px] h-auto absolute border-purple-500 border-2")}
      autoPlay
      muted={isLocalStream}
      playsInline
    ></video>
  );
};

export default VideoContainer;