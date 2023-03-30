const express = require('express');
const router = express.Router();
const Film = require("../models/Film");
const {verifyToken } = require('../middlewares/auth')

//POST Create an endpoint that creates a new film in films collection
router.post('/', verifyToken, (req, res) => {
  const {name, year, genre} = req.body;
  Film.create({name, year, genre})
  .then((data) => res.json(data))
  .catch((e) => console.log(e.message))
})

// //GET Create an endpoint to retrieve all films
router.get('/', (req, res) => {
  Film.find({})
    .then(data => res.json(data))
});

// //GET Create an endpoint to retrieve s specific film by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Film.findById(id)
    .then(data => {
      if (!data) {
        // Send 404 if no film is found with the specified _id
        return res.sendStatus(404); 
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

// PUT Create an enspoint that updates an existing film in films table
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, year, genre } = req.body;
  Film.findByIdAndUpdate(id, { name, year, genre }, { new: true })
    .then(data => {
      if (!data) {
        // Send 404 if no film is found with the specified _id
        return res.sendStatus(404); 
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

// DELETE Create an enDpoint that DELETES an existing film in films collection
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Film.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        // Send 404 if no film is found with the specified _id
        return res.sendStatus(404); 
      }
      res.sendStatus(204);
    })
    .catch(err => {
      console.log(err.message);
      res.sendStatus(500);
    });
});


module.exports = router
