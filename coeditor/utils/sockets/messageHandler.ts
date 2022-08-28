import ChatMessage from "../../models/chatMessage";

export function messageHandler(socket: any){
    const createdMessage = async (msg: ChatMessage) => {
      await fetch("/api/messages/send-message", {
        body: JSON.stringify({ message: msg }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      socket.broadcast.emit("newIncomingMessage", msg);
    };

    socket.on("create-message", createdMessage);
  };