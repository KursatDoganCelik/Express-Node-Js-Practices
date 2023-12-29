import express from 'express'

// import bodyParser for middleWare part
import bodyParser from 'body-parser'

// dynmaic directory name
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000

// middleWare part
app.use(bodyParser.urlencoded({ extended: true }))

// send home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// if user submit log the data
app.post('/submit', (req, res) => {
  console.log(req.body)
})

// log the listen part
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
