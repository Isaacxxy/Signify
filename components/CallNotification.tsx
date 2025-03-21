// "use client";
// import { useSocket } from "@/context/SocketContext";
// import { Button } from "./ui/button";
// import { MdCall, MdCallEnd } from "react-icons/md";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// const CallNotification = () => {
//   const { onGoingCall } = useSocket();
//   if (!onGoingCall?.isRinging) return;

//   return (
//     <div className="absolute bg-slate-500 w-screen bg-opacity-70 h-screen top-0 left-0 flex items-center justify-center">
//       <div className="bg-white min-w-[300px] win-h-[100px] flex flex-col items-center justify-center rounded p-4 ">
//         <div className="flex flex-col items-center">
//           <Avatar>
//             <AvatarImage src={onGoingCall.participants.caller.profile.imageUrl} className='h-[40px] w-[40px]' />
//             <AvatarFallback>
//               {onGoingCall.participants.caller.profile.fullName?.charAt(0)}
//             </AvatarFallback>
//           </Avatar>
//           <h3>{onGoingCall.participants.caller.profile.fullName?.split(' ')[0]}</h3>
//         </div>
//         <p className="text-sm mb-2">Incoming Call</p>
//         <div className="flex gap-8">
//           <Button
//             onClick={() => { }}
//             className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"
//           >
//             <MdCall size={24} />
//           </Button>
//           <Button
//             onClick={() => { }
//             }
//             className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white"
//           >
//             <MdCallEnd size={24} />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CallNotification;
"use client";
import { useSocket } from "@/context/SocketContext";
import { Button } from "./ui/button";
import { MdCall, MdCallEnd } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CallNotification = () => {
  const { onGoingCall, handleJoinCall, handleHangup } = useSocket();
  if (!onGoingCall?.isRinging) return;

  return (
    <div className="absolute bg-slate-500 w-screen bg-opacity-70 h-screen top-0 left-0 flex items-center justify-center">
      <div className="bg-white min-w-[300px] win-h-[100px] flex flex-col items-center justify-center rounded p-4 ">
        <div className="flex flex-col items-center">
          <Avatar>
            <AvatarImage src={onGoingCall.participants.caller.profile.imageUrl} className='h-[40px] w-[40px]' />
            <AvatarFallback>
              {onGoingCall.participants.caller.profile.fullName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h3>{onGoingCall.participants.caller.profile.fullName?.split(' ')[0]}</h3>
        </div>
        <p className="text-sm mb-2">Incoming Call</p>
        <div className="flex gap-8">
          <Button
            onClick={() => handleJoinCall(onGoingCall)}
            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"
          >
            <MdCall size={24} />
          </Button>
          <Button
            onClick={() =>
              handleHangup({
                onGoingCall: onGoingCall ? onGoingCall : undefined,
                isEmitHangup: true,
              })
            }
            className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white"
          >
            <MdCallEnd size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallNotification;