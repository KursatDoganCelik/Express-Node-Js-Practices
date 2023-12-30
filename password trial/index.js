// import express
import express from 'express'

// dynamic directory name
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

// define app and port
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }))

// check password
let userAuthorised = false
function passwordChecker(req, res, next) {
  const guessedValue = req.body.password
  if (guessedValue === '15 meter ethernet cable') {
    userAuthorised = true
  } else {
    userAuthorised = false
  }
  next()
}
app.use(passwordChecker)

// send home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

// check password guess
app.post('/check', (req, res) => {
  if (userAuthorised) {
    res.sendFile(__dirname + '/public/password.html')
  } else {
    res.redirect('/')
  }
})

// log the listening port
app.listen(port, () => {
  console.log(`Listening o port ${port}`)
})
