const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const app = express()
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
})

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('It is running.')
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db)
})

app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 5000, () => {
  if (process.env.PORT)
    console.log(`app is running on port ${process.env.PORT}`)
  console.log(`app is running on port 5000`)
})