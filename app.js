const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
const errHandler = require('./middlewares/errHandler')
const authCont  = require("./controllers/authcont")
 
app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(errHandler)

router.post("/login", authCont.login );
router.post("/register", authCont.register);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})