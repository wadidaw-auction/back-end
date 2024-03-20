const express = require('express')
const app = express()
const port = 3000 
const {Server} = require("socket.io")
const {createServer} = require("http")
const cors = require('cors')
const Controller = require('./controllers/controller')
 
app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

const httpServer = createServer(app)
const io = new Server(httpServer,{
  cors : {
    origin : "http://localhost:5173"
  }
})

io.on('connection', (socket) => {
  // console.log(socket);
  // console.log(socket.id, "< user");
  // console.log(socket.handshake.auth, "<handshake");

  socket.emit("message", "Welcome " + socket.id)

  socket.on("placeBid", (param)=>{
    // console.log(param); // {name,price}
     
    Controller.placeBid
  })
});

/// user dapat place bid ketika input price > price database
io.on('placeBid', (socket) => {

})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})