import express from 'express';
import { deleteUser, getUserById, getUsers, updateUser, updateUserRole /* другие методы */ } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { roleMiddleware } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(authMiddleware);


router.get('/', roleMiddleware(['admin']), getUsers)
router.get('/:id', roleMiddleware(['admin']), getUserById)
router.patch('/:id', roleMiddleware(['admin']), updateUser)
router.delete('/:id', roleMiddleware(['admin']), deleteUser)

router.patch('/:id/role', roleMiddleware(['admin']), updateUserRole);

export default router;
