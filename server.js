const dotenv = require('dotenv')
dotenv.config()

require('./db')

const express = require('express')
const app = express()

const cors = require('cors')
const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const routes = require('./routes/routes.js')
app.use(cors())
// app.use(cors(corsOptions))
app.use(express.json())
app.use(routes)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`server running on port ${port}.`))