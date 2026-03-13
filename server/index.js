const express = require("express")
const cors = require("cors")

const bodyParser = require("body-parser")
const router = require('./src/routes/index')

const app = express()
var corsOptions = {
  origin: ['http://localhost:3000', ],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v1', router)
app.use((req, res) => {
  res.status(404).send('URL not found!')
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})