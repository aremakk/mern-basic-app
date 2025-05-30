import express from 'express';
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from '../controllers/service.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';
import { roleMiddleware } from '../middleware/role.middleware.js';
import { cacheMiddleware } from '../middleware/cache.middleware.js';

const router = express.Router();

router.use(authMiddleware);

// Получать услуги могут и admin и user
router.get('/', roleMiddleware(['admin', 'user']), cacheMiddleware('services', 60), getServices);
router.get('/:id', roleMiddleware(['admin', 'user']), getServiceById);

// Создавать, изменять, удалять — только admin
router.post('/', roleMiddleware(['admin']), createService);
router.patch('/:id', roleMiddleware(['admin']), updateService);
router.delete('/:id', roleMiddleware(['admin']), deleteService);

export default router;
