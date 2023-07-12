import { UserController } from './controllers/usersController';
import { LockController } from './controllers/locksController';
import express from 'express'

export const router = express.Router();

router.post('/create', UserController.createUser);

router.get('/users', UserController.getAllUser);
router.get('/users/:id', UserController.getUser)
router.get('/stations', LockController.getStations);

router.post('register', UserController.registerUser);
router.post('/stations', LockController.createStation);
router.post('/logout', authenticateMiddleware, usersController.logout);

