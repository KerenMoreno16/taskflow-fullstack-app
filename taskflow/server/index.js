require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const taskRoutes = require('./routes/taskRoutes')

const app = express()

app.use(cors())

app.use(express.json())

app.use('/tasks', taskRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

console.log(process.env.MONGO_URI)

app.listen(5000, () => {
  console.log('Server running')
})
