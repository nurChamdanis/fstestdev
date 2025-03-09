import express from 'express';
import { updateUserData, fetchUserData, addUserData, initDocUSer, deleteUserData } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/', authMiddleware, initDocUSer);

router.delete('/delete/:collectionId/:noDoc', authMiddleware, deleteUserData);
router.put('/update', authMiddleware, updateUserData);
router.get('/fetch/:collectionId/:noDoc', authMiddleware, fetchUserData);
router.post('/create', authMiddleware, addUserData);

export default router;