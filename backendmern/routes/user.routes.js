import express from 'express';
import { updateUserRole /* другие методы */ } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { roleMiddleware } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(authMiddleware);

// Остальные маршруты...

// Изменение роли — только для админа
router.patch('/:id/role', roleMiddleware(['admin']), updateUserRole);

export default router;
