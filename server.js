require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 8001
const films = require('./router/filmsRouter');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use('/api/films', films)
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

