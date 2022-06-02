import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export default function Index() {
  const [message, setMessage] = useState("待機中");
  const [, setSocket] = useState<Socket>();
  useEffect(() => {
    const socket = io("/messages");
    setSocket(socket);
    socket.on("serverMsg", (msg) => {
      console.log("msg received: ", msg);
      setMessage(msg.message);
    });
    console.log("socket.id: ", socket);
    setTimeout(() => {
      socket.emit("post", {
        id: "user-id-1",
        roomId: "room-id-1",
        message: "Hello World"
      })
    }, 1000)

    return () => {
      socket.close();
    }
  }, []);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix Socket</h1>
      <h2>{message}</h2>
    </div>
  );
}