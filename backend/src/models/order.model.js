import mongoose from 'mongoose';
import orderStatus from '../domain/orderStatus.js';
import paymentStatus from '../domain/paymentStatus.js';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    orderItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrderItem',
        }
    ],
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    totalMrpPrice: {
        type: Number,
        required: true
    },
    totalSellingPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        // required: true
    },
    orderStatus: {
        type: String,
        enum: Object.values(orderStatus),
        default: orderStatus.PENDING
    },
    totalItem: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: Object.values(paymentStatus),
        default: paymentStatus.PENDING
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date,
        default: function () {
            return Date.now() + 7 * 24 * 60 * 60 * 1000;
        }
    },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;