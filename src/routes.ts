import { UserController } from './controllers/usersController';
import { LockController } from './controllers/locksController';
import { createLock, getLockById, updateLock, openLock, closeLock, getStations, getByStation } from "./controllers/lock";
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
router.post('/createLock/:qrcode/:station', createLock);
router.get('/getLockById/:idLock', getLockById);
router.put('/openLock/:qrcode/:matricula', openLock);
router.put('/closeLock/:qrcode/:matricula', closeLock);
router.get('/stations', getStations);
router.get('/getByStation/:station', getByStation);


export { router as routes };
