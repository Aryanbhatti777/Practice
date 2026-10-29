import { Server } from 'socket.io';

export default (httpServer) => {

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("user connected with id ", socket.id);

        socket.on("message", (msg) => {
            socket.broadcast.emit("message", msg)
        })
    })
}