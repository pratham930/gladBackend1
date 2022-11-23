import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connectdb.js'
import { createServer } from 'http';
import { Server } from 'socket.io';

import userRoute from './routes/user.js'
import staffRoute from './routes/staff.js'
import sellerRoute from './routes/seller.js'


const port = process.env.PORT || '8001'
const DATABASE_URL =
  'mongodb+srv://glad:lookman17@glad.dkowsha.mongodb.net/?retryWrites=true&w=majority'
// mongodb+srv://pratham:lookman17@cluster1.vuxzs.mongodb.net/?retryWrites=true&w=majority
connectDB(DATABASE_URL)
export const app = express()


const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
//  app.use(cookieParser())
app.use(express.json())
dotenv.config({ path: './config.env' })
app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use('/api', userRoute)
app.use('/api', staffRoute)
app.use('/api', sellerRoute)


// app.listen(port, () => {
//   console.log(`local host:${port}`)
// })

const server = httpServer.listen(port, () => {
  console.log(`local host:${port}`)
})
io.listen(server)


io.on("connection", (socket) => {
  // SOCKET CONNECTION ESTABLISHED
  console.log("Connected to socket.io with id --> ", socket.id);
  socket.emit("connected");


  socket.on("setup", (userData) => {
    //  socket.join(userData._id);
    console.log(userData, "64")
    socket.emit("connected")
  })

})