const express = require('express')
const path = require('path')
const morgan = require('morgan')
const multer = require('multer')
const uuid = require('uuid/v4')
const { format } = require('timeago.js')

// Initializations
const app = express()
require('./database')

// Settings
const port = (process.env.PORT || 3000)
const publicDir = express.static(`${__dirname}/public`)
const viewDir = `${__dirname}/views`
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/uploads'),
  filename: (req, file, cb, filename) => {
    cb(null, uuid() + path.extname(file.originalname))
  }
})

app
  .set('views', viewDir)
  .set('view engine', 'ejs')

// Middlewares
app
  .use(morgan('dev'))
  .use(express.urlencoded({ extended: false }))
  .use(multer({ storage }).single('image'))

// Global Variables
app.use((req, res, next) => {
  app.locals.format = format
  next()
})

// Routes
app
  .use(require('./routes'))

// Static files
app.use(publicDir)

// Start the server
app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
