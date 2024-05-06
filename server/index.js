require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./routes/routes')
const cors = require('cors')

const app = express()
app.use(
  cors({
    origin: '*',
  })
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', router)

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({ error: err })
})

mongoose
  .connect(process.env.mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))
mongoose.set('useCreateIndex', true)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
