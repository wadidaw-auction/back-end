const express = require('express')
const app = express()

const port = 3000 
const {Server} = require("socket.io")
const {createServer} = require("http")
const cors = require('cors')

const errHandler = require('./middlewares/errHandler')
const authCont  = require("./controllers/authcont")
const Controller = require('./controllers/controller')
const { authen } = require('./middlewares/authen')

const { Product } = require('./models')
const { getUserByToken } = require('./helpers/jwt')

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

const httpServer = createServer(app)
const io = new Server(httpServer,{
  cors : {
    origin : "https://client-gproject.farreldevara.online"
  }
})

io.on('connection', (socket) => {
  // console.log(socket);
  // console.log(socket.id, "< user");
  // console.log(socket.handshake.auth, "< handshake");
  
  socket.emit("message", "Welcome " + socket.id)

  socket.on("bidRoom", (roomId) => {
    // console.log(roomId, "<<<<<<<<<<<<<<<<<,");
    socket.join(roomId);
  });

  socket.on("placeBid", async (param)=>{
     
    // console.log(param);
    const {token, price, id, roomId} = param

    try {

        let dataUser = await getUserByToken(token)
        
        const product = await Product.findByPk(id)

        const updatedData = await product.update({
            last_bidder : dataUser.id,
            price
        })
        // console.log(updatedData, "<<<<<<<<<<<<<<<< updated data");
        // io.emit("New Bidder", updatedData) //updatedData
        // console.log(roomId,updatedData,"<<<< roomId");
        io.to(roomId).emit("New Bidder", updatedData);
        io.emit("New_Bidder_" + roomId, updatedData);
        io.emit("toast", dataUser)
    } catch (error) {
        console.log(error);
    }
  })
});

app.post("/login", authCont.login );
app.post("/register", authCont.register);


app.get("/products", Controller.showAllProduct);
app.get("/user", Controller.showAllUser)
app.get("/user/:id", Controller.findUserbyId)
// app.use(authen)
app.get("/product/:id", Controller.showProductById);


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(errHandler)

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})