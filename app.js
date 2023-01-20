import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connectdb.js'
import { createServer } from 'http';
import { Server } from 'socket.io';

import userRoute from './routes/user.js'
import staffRoute from './routes/staff.js'
import sellerRoute from './routes/seller.js'


const port = process.env.PORT || '8001';

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



const array1 = [
  {
    id: 1,
    name: "mango",
    quantity: 25
  },
  {
    id: 2,
    name: "apple",
    quantity: 25
  },
  {
    id: 3,
    name: "pine",
    quantity: 25
  },
]

const array2 = [
  {
    id: 1,
    name: "mango",
    quantity: 5
  },
  {
    id: 2,
    name: "pine",
    quantity: 2
  },
  {
    id: 3,
    name: "apple",
    quantity: 20
  },
]

const sita = () => {
  let ramu = []
  for (let index = 0; index < array1.length; index++) {
    const element1 = array1[index].name;
    const element2 = array1[index].quantity;
    const element3 = array1[index].id;
    const raja = array2.map((e, i) => {
      if (element1 == e.name) {
        const u = { name: e.name, quantity: e.quantity + element2, id: e.id }
        ramu.push(u)
      }
      else {
        return { ...ramu, e }
      }
    }
    )

  }
  return ramu
}
// console.log(sita(), "message")