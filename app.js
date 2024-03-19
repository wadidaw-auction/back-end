const express = require('express')
const app = express()
const port = 3000 
const {Server} = require("socket.io")
const {createServer} = require("http")
const cors = require('cors')
 
app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

const httpServer = createServer(app)
const io = new Server(httpServer,{
  cors : {
    origin : "http://localhost:5173"
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})