"use client";
import { useSocket } from "@/context/SocketContext";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

const Chat = () => {
  const { user } = useUser();
  const { onlineUsers, sendMessage, messages } = useSocket();
  const [text, setText] = useState("");
  const [receiverId, setReceiverId] = useState("");

  const handleSend = () => {
    if (receiverId && text.trim()) {
      sendMessage(receiverId, text);
      setText("");
    }
  };

  return (
    <div className="">
      <h2 className="text-lg font-bold pb-4 text-white">Chat</h2>
      <select onChange={(e) => setReceiverId(e.target.value)} value={receiverId} className="border p-2">
        <option value="">Select User</option>
        {onlineUsers
          ?.filter((u) => u.userId !== user?.id)
          .map((u) => (
            <option key={u.userId} value={u.userId}>
              {u.profile.fullName}
            </option>
          ))}
      </select>

      <div className="mt-4">
        {messages.map((msg, index) => (
          <p key={index} className={msg.senderId === user?.id ? "text-blue-500" : "text-gray-500"}>
            {msg.senderId === user?.id ? "You" : "Other"}: {msg.text}
          </p>
        ))}
      </div>

      <input
        className="border p-2 mt-2"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSend} className="ml-2 p-2 bg-blue-500 text-white">
        Send
      </button>
    </div>
  );
};

export default Chat;


// import React, { useState } from "react";
// import { useSocket } from "@/context/SocketContext";

// const Chat = ({ receiverId }: { receiverId: string }) => {
//   const { handleSendMessage } = useSocket();
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState<{ sender: string; text: string }[]>([]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       handleSendMessage(receiverId, message);
//       setChatHistory((prev) => [...prev, { sender: "You", text: message }]);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-history">
//         {chatHistory.map((msg, index) => (
//           <div key={index} className="chat-message">
//             <strong>{msg.sender}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;