const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
const errHandler = require('./middlewares/errHandler')
const authCont  = require("./controllers/authcont")
const Controller = require('./controllers/controller')
const { authen } = require('./middlewares/authen')

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.post("/login", authCont.login );
app.post("/register", authCont.register);

app.get("/user", Controller.showAllUser)
app.get("/user/:id", Controller.findUserbyId)
app.get("/products", Controller.showAllProduct);
app.post("/products/add",  authen, Controller.addProduct)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(errHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})