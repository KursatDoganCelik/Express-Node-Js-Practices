import express from 'express'

// define app and port
const app = express()
const port = 3000

// send index.ejs and variables
app.get('/', (req, res) => {
  // take today number
  const day = new Date()
  const todayNumber = day.getDay()

  //switch today number to day name
  let today
  switch (todayNumber) {
    case 0:
      today = 'sunday'
      break
    case 1:
      today = 'monday'
      break
    case 2:
      today = 'tuesday'
      break
    case 3:
      today = 'wednesday'
      break
    case 4:
      today = 'thursday'
      break
    case 5:
      today = 'friday'
      break
    case 6:
      today = 'saturday'
      break
  }

  res.render('index.ejs', {
    day: today,
    advice: "<p>Let's get some juice.</p>",
    fruits: ['Apple', 'Orange', 'Peach'],
  })
})

// log the listening port
app.listen(port, () => {
  console.log(`Server listening on ${port}.`)
})
