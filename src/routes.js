import { UserController } from './controllers/locksController';
import { LockController } from './controllers/locksController';

const express = require('express');
const router = express.Router();

router.get('/users', UserController.getAllUser);
router.get('/users/:id', UserController.getUser)
router.get('/stations', LockController.getStations);

router.post('register', UserController.registerUser);
router.post('/stations', LockController.createStation);
router.post('/logout', authenticateMiddleware, usersController.logout);


module.exports = router;
