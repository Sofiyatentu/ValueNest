import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import registerRouter from './routes/authRoutes.js';
import adminProductRoutes from './routes/admin/productRoutes.js';
import shopProductRoutes from './routes/shop/productRoutes.js';
import cartRoutes from './routes/shop/cartRoutes.js';
import addressRoutes from './routes/shop/addessRoutes.js';
import orderRoutes from './routes/shop/orderRoutes.js';
import adminOrderRoutes from './routes/admin/orderRoutes.js';
import searchRoutes from './routes/shop/searchRoutes.js';
import reviewRoutes from './routes/shop/reviewRoutes.js';
import featureRoutes from './routes/common/featureRoutes.js';

mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log('mongodb connected'))
  .catch((error) => {
    console.error('Mongo connection error:', error);
  });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', registerRouter);
app.use('/api/admin/products', adminProductRoutes);
app.use('/api/shop/products', shopProductRoutes);
app.use('/api/shop/cart', cartRoutes);
app.use('/api/shop/address', addressRoutes);
app.use('/api/shop/order', orderRoutes);
app.use('/api/admin/orders', adminOrderRoutes);
app.use('/api/shop/search', searchRoutes);
app.use('/api/shop/review', reviewRoutes);
app.use('/api/common/feature', featureRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
