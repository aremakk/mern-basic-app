import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getNearestAppointment,
} from '../controllers/appointment.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';
import { roleMiddleware } from '../middleware/role.middleware.js';
import { cacheMiddleware } from '../middleware/cache.middleware.js';

const router = express.Router();

router.use(authMiddleware);

// Получать записи могут админ и юзер
router.get('/', roleMiddleware(['admin', 'user']), cacheMiddleware('appointments', 60), getAppointments);
router.get('/nearest', roleMiddleware(['admin', 'user']), cacheMiddleware('next-appointment', 60), getNearestAppointment)
router.get('/:id', roleMiddleware(['admin', 'user']), getAppointmentById);

// Создавать, изменять, удалять — только админ
router.post('/', roleMiddleware(['admin', 'user']), createAppointment);
router.patch('/:id', roleMiddleware(['admin', 'user']), updateAppointment);
router.delete('/:id', roleMiddleware(['admin', 'user']), deleteAppointment);

export default router;
