import { UserController } from './controllers/usersController';
import { LockController } from './controllers/locksController';
import express from 'express';

const router = express.Router();

const userController = new UserController();
const lockController = new LockController();

router.post('/create', userController.createUser);
router.get('/users', userController.getAllUsers);

// Não existem ainda:
// router.get('/users/:id', userController.getUser);
// router.post('register', userController.registerUser);
// router.get('/stations', lockController.getStations);
// router.post('/stations', lockController.createStation);
// router.post('/logout', authenticateMiddleware, usersController.logout);

export { router as routes };
