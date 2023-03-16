const { Pool } = require('pg')
const express = require('express');
const router = express.Router();

const pool = new Pool();

const authMiddleware = (req, res, next) => {
  const secretToken = process.env.SECRET_TOKEN;
  const userToken = req.body.token;

  if(!userToken || userToken !== secretToken){
    res.status(401).json({error: 'Unauthorized'})
  } else {
    next()
  }
}

//GET Create an endpoint to retrieve all films
router.get('/', (req, res) => {
  pool
  .query('SELECT * from films;')
  .then(({rows}) => res.json(rows))
  .catch(e => res.sendStatus(500))
})

//GET Create an endpoint that a specific film
router.get("/:id", (req, res) => {
  const id = req.params.id
  pool
  .query('SELECT * from films WHERE id=$1;', [id])
  .then(({rows}) => res.json(rows))
  .catch(e => res.sendStatus(500))
});

//POST Create an endpoint that creates a new film/row in films table
router.post('/', (req, res) => {
  const {name, year, genre } = req.body;
  pool
  .query('INSERT INTO films(name, year, genre ) VALUES ($1, $2, $3) RETURNING *;', [name, year, genre])
  .then(({rows}) => res.json(rows))
  .catch(e => res.sendStatus(500))
})

// PUT Create an enspoint that updates an existing film in films table
router.put('/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  const {name} = req.body;
  pool
  .query('UPDATE films SET name=$1 WHERE id=$2 RETURNING *;', [name, id])
  .then(({rows}) => res.json(rows))
  .catch(e => res.sendStatus(500))
})

//DELETE Create an endpoint that deletes an existing film in films table
router.delete('/:id', (req, res) => {
  const id = req.params.id
  pool
  .query('DELETE FROM films WHERE id=$1;', [id])
  .then(({rows}) => res.json(rows))
  .catch(e => {
    console.log(e, 'error')
    res.sendStatus(500)
  })
})

module.exports = router
