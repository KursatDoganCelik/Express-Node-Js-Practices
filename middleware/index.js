import express from 'express'

// bodyParser for pre-processing part
import bodyParser from 'body-parser'

// morgan for logging part
import morgan from 'morgan'

// dynmaic directory name
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000

// custom middleWare
function logger(req, res, next) {
  console.log(`Method: ${req.method}`)
  console.log(`Url: ${req.url}`)
  next()
}
app.use(logger)

// pre-processing part
app.use(bodyParser.urlencoded({ extended: true }))

// logging part
app.use(morgan('dev'))

// just connect names
let fullName = ''
function connectName(req, res, next) {
  let firstName = req.body.fName
  let lastName = req.body.lName
  fullName = `${firstName} ${lastName}`
  next()
}
app.use(connectName)

// send home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// if user submit log the data
app.post('/submit', (req, res) => {
  res.send(`<h1>Your Name is:</h1><h2>${fullName}</h2>`)
})

// log the listen part
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
