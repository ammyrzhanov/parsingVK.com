const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed');

router.get('/user/:id', feedController.user);


module.exports = router;
