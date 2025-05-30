import express from 'express';
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
  getClientsCreatedToday,
} from '../controllers/client.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { cacheMiddleware } from '../middleware/cache.middleware.js';


const router = express.Router();

router.use(authMiddleware)

router.post('/', createClient);
router.get('/', cacheMiddleware('clients', 60), getClients);
router.get('/today', cacheMiddleware('clientCount', 60), getClientsCreatedToday);
router.get('/:id', getClientById);
router.patch('/:id', updateClient);
router.delete('/:id', deleteClient);


export default router;
