import express from 'express';
import { updateUserData, fetchUserData, addUserData, initDocUSer, deleteUserData } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/:collectionId', authMiddleware, initDocUSer);
router.delete('/delete/:id/:collectionId', authMiddleware, deleteUserData);
router.put('/update', authMiddleware, updateUserData);
router.get('/fetch/:id/:collectionId', authMiddleware, fetchUserData);
router.post('/create', authMiddleware, addUserData);

export default router;