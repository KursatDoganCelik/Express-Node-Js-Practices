import express from 'express'
import bodyParser from 'body-parser'
import pg from 'pg'

const app = express()
const port = 3000

// Connect to the database
const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: 'password',
  port: 5432,
})
db.connect()

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// Get all users
async function getUsers() {
  const result = await db.query('SELECT * FROM users')
  const users = result.rows
  return users
}

// Get current user
let currentUserId = 1
async function getCurrentUser() {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [currentUserId])
  const user = result.rows
  return user
}

// Get visited countries
async function checkVisisted() {
  const result = await db.query('SELECT country_code FROM visited_countries WHERE user_id = $1', [currentUserId])
  let countries = []
  result.rows.forEach((country) => {
    countries.push(country.country_code)
  })
  return countries
}

// GET Routes
app.get('/', async (req, res) => {
  const countries = await checkVisisted()
  const users = await getUsers()
  const user = await getCurrentUser()
  res.render('index.ejs', {
    countries: countries,
    total: countries.length,
    users: users,
    color: user[0].color,
  })
})

// POST '/add' Routes
app.post('/add', async (req, res) => {
  const input = req.body.country
  try {
    const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';", [input.toLowerCase()])
    const countryCode = result.rows[0].country_code

    try {
      await db.query('INSERT INTO visited_countries VALUES ($1,$2)', [countryCode, currentUserId])
      res.redirect('/')
    } catch (err) {
      const countries = await checkVisisted()
      const users = await getUsers()
      const user = await getCurrentUser()
      res.render('index.ejs', {
        countries: countries,
        total: countries.length,
        users: users,
        color: user[0].color,
        error: 'Country has already been added, try again.',
      })
    }
  } catch (err) {
    const countries = await checkVisisted()
    const users = await getUsers()
    const user = await getCurrentUser()
    res.render('index.ejs', {
      countries: countries,
      total: countries.length,
      users: users,
      color: user[0].color,
      error: 'Country name does not exist, try again.',
    })
  }
})

// POST '/user' Routes
app.post('/user', async (req, res) => {
  if (req.body.add === 'new') {
    res.render('new.ejs')
  } else {
    const input = req.body.user
    currentUserId = input
    res.redirect('/')
  }
})

// POST '/new' Routes
app.post('/new', async (req, res) => {
  const name = req.body.name
  const color = req.body.color

  await db.query('INSERT INTO users (name, color) VALUES ($1, $2)', [name, color])
  res.redirect('/')
})

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
