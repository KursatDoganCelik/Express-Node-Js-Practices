import express from 'express'
import axios from 'axios'

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://bored-api.appbrewery.com/random')
    const result = response.data
    res.render('index.ejs', { data: result })
  } catch (error) {
    console.error('Failed to make request:', error.message)
    res.render('index.ejs', {
      error: error.message,
    })
  }
})

app.post('/', async (req, res) => {
  const type = req.body.type
  const participants = req.body.participants

  try {
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`)
    const result = response.data
    const randomResult = result[Math.floor(Math.random() * result.length)]
    res.render('index.ejs', { data: randomResult })
  } catch (error) {
    console.error('Failed to make request:', error.message)
    res.render('index.ejs', {
      error: 'No activities that match your criteria.',
    })
  }
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
