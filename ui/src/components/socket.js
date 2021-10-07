import socketClient from "socket.io-client";

export const socket = socketClient("ws://localhost:3030", {
  transports: ["websocket"],
});
