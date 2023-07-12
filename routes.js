const express = require('express');
const router = express.Router();

const routes = Router()
const usersController = require('./usersController');
const stationsController = require('./stationsController');


router.use('/users', usersController);
router.use('/stations', stationsController);

module.exports = router;
