require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const registerRouter = require('./routes/authRoutes');
const adminProductRoutes = require('./routes/admin/productRoutes');
const shopProductRoutes = require('./routes/shop/productRoutes');
const cartRoutes = require('./routes/shop/cartRoutes');
const addressRoutes = require('./routes/shop/addessRoutes');
const orderRoutes = require('./routes/shop/orderRoutes');
const adminOrderRoutes = require('./routes/admin/orderRoutes');
const searchRoutes = require('./routes/shop/searchRoutes');
const reviewRoutes = require('./routes/shop/reviewRoutes');
const featureRoutes = require('./routes/common/featureRoutes');

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
  }),
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
my file is like this
