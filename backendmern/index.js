import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import clientRoutes from './routes/client.routes.js';
import serviceRoutes from './routes/service.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())



app.get('/', (req, res) => {
    res.send('Hello');
  });
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes)
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);

// DB + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB подключен');
    app.listen(8081, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
  })
  .catch((err) => console.error('Ошибка подключения к MongoDB:', err));
