import express from 'express'
import axios from 'axios'

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', async (req, res) => {
  const url = 'https://v2.jokeapi.dev/joke/Any?type=single'
  try {
    const result = await axios.get(url)

    res.render('index.ejs', {
      joke: result.data.joke,
      category: result.data.category,
    })
  } catch (error) {
    console.log(error.response.data)
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
