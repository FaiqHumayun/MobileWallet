const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()

mongoose
  .connect(process.env.mongoDbUrl)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello MERN!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
