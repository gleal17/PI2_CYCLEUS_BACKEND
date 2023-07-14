import { UserController } from './controllers/usersController';
import { LockController } from './controllers/locksController';
import express from 'express';

const router = express.Router();

const userController = new UserController();
const lockController = new LockController();


//users
router.post('/create', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserByMatricula);


//locks
router.get('/stations', lockController.getStations);
router.get('/locks/:id', lockController.getLockById);
router.post('/locks', lockController.createLock);
router.patch('/locks/:id', lockController.updateLock);


// Não existem ainda:
// router.post('register', userController.registerUser);
// router.get('/stations', lockController.getStations);
// router.post('/stations', lockController.createStation);
// router.post('/logout', authenticateMiddleware, usersController.logout);

export { router as routes };
