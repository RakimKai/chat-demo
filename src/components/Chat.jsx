import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

import Message from "./Message";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const inputRef = useRef("");
  const roomRef = useRef("");
  const socketRef = useRef(io("http://localhost:3000"));

  useEffect(() => {
    socketRef.current.on("recieve-message", (msg) => {
      const message = { id: 0, text: msg };
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socketRef.current.off("recieve-message");
    };
  }, []);

  const joinRoom = () => {
    const room = roomRef.current.value;
    socketRef.current.emit("join-room", room);
    alert(`You have successfully joined ${room}.`);
  };

  const sendMessage = () => {
    const msg = inputRef.current.value;
    const message = { id: 1, text: msg };
    const room = roomRef.current.value;
    inputRef.current.value = "";
    setMessages((prev) => [...prev, message]);
    socketRef.current.emit("send-message", msg, room);
  };
  return (
    <div className="flex gap-5 flex-col justify-center items-center min-h-screen bg-background-900 font-poppins">
      <h1 className="text-4xl text-gray-300 font-semibold">Yappingtown</h1>
      <div className="w-1/3 mb-20">
        <div className="bg-background-800 rounded-md border-4 pt-3 relative border-secondary-700 h-96 flex flex-col overflow-y-auto">
          {messages.map((msg, index) => {
            return <Message key={index} text={msg.text} id={msg.id} />;
          })}
          <div className="bg-secondary-700 absolute w-full flex justify-between p-2 bottom-0">
            <input
              placeholder="Write a message"
              ref={inputRef}
              className="w-64 rounded-md p-1 focus:outline-none border-black"
            ></input>
            <button
              onClick={sendMessage}
              className="ml-5 rounded-md px-2 w-24 text-black  bg-primary-500 font-light hover:bg-primary-400 "
            >
              Send
            </button>
          </div>
        </div>
        <div className="bg-secondary-700 mt-5 rounded p-2 border-4 border-secondary-700 flex justify-between bottom-0">
          <input
            placeholder="Join a room"
            ref={roomRef}
            className="w-64 rounded-md p-1 focus:outline-none border-black"
          ></input>
          <button
            onClick={joinRoom}
            className="ml-5 rounded-md px-2 w-24 text-black  bg-primary-500 font-light hover:bg-primary-400 "
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
