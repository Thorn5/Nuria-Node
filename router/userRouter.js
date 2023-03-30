const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.MY_SECRET;

const generateToken = (data) => {
    return jwt.sign(data, secret, {expiresIn: '1800s'});
}

//POST Create an endpoint that creates a new user in users collection
router.post('/signup', (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then((hashedPasword) => {
        User.create({first_name, last_name, email, password: hashedPasword})
        .then((data) => res.json(data))
        .catch((e) => console.log(e.message))
    })
    .catch((e) => res.sendStatus(500))
})

//POST Create an endpoint for log in user
router.post('/login', (req, res) => {
    const {email, password} = req.body;
    User.findOne({email})
    .then((user) => {
        if(!user){
            return res.status(404).send("Invalid credentials")
        }
        bcrypt.compare(password, user.password)
        .then((validPassword) => {
            if(!validPassword){
                return res.status(404).send("Invalid credentials")
            }
            const token = generateToken({email: user.email})
            res.json({token});
        })
    })
    
})

module.exports = router;