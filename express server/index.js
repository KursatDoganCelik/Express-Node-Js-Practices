// import express
import express from 'express'

// take app and define port
const app = express()
const port = 3000

// send simple data to main endpoint -> '/'
app.get('/', (req, res) => {
  res.send('<h1>Heyyo Word</h1>')
})

// send simple data to about endpoint -> '/about'
app.get('/about', (req, res) => {
  res.send('<h2>Soligin</h2>')
})

// take information and do what you need
app.post('/register', (req, res) => {
  res.sendStatus(201)
})

// update - all info need to modified
app.put('/user/soligin', (req, res) => {
  res.sendStatus(200)
})

// update - not all info needed to modified
app.patch('/user/soligin', (req, res) => {
  res.sendStatus(200)
})

// just delete thing
app.delete('/user/soligin', (req, res) => {
  res.sendStatus(200)
})

// listen server and log the port
app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})
