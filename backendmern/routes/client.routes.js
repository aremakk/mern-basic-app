import express from 'express';
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from '../controllers/client.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


const router = express.Router();

router.use(authMiddleware)

router.post('/', createClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.patch('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
