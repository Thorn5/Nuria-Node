require('dotenv').config();
require("./database/client");
const client = require("./database/client");
const express = require('express')
const app = express()
const port = process.env.PORT || 8001
const films = require('./router/filmsRouter');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('combined'))

app.use(bodyParser.json())
app.use('/api/films', films)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

