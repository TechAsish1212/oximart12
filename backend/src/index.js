import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // Load env FIRST

import express from "express";
import connectDB from "./db/db.js";
import sellerRoutes from "./routes/seller.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import sellerProductRoutes from "./routes/sellerProduct.route.js";
import cartItemRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";
import sellerOrderRoutes from "./routes/sellerOrder.route.js";
import paymentRoutes from './routes/payment.route.js';
import transactionRoutes from './routes/transaction.route.js';
import sellerReportRoutes from './routes/sellerReport.route.js';
import dealRoutes from './routes/deal.route.js';
import homeCategoryRoutes from './routes/homeCategory.route.js';

dotenv.config({
    path: './.env'
})

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/seller', sellerRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.use('/api/v1/product', productRoutes);
app.use('/api/v1/seller/product', sellerProductRoutes);
app.use('/api/v1/cart', cartItemRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/seller/order', sellerOrderRoutes);

app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/sellers/reports', sellerReportRoutes);

app.use('api/v1/admin/deals',dealRoutes);
app.use('/api/v1/home',homeCategoryRoutes);


connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

