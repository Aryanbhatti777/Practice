import {createServer} from 'http'
import app from './app/app.js'
import initSocket from './sockets/socket.server.js'
const httpServer = createServer(app);

initSocket(httpServer);

httpServer.listen(3000, () => console.log("Server up on 3000"));