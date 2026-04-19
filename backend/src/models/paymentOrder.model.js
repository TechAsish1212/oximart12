import mongoose from "mongoose";
import paymentStatus from "../domain/paymentStatus.js";

const paymentOrderSchema = new mongoose.Schema({
    orders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    amount:{
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(paymentStatus),
        default: paymentStatus.PENDING,
    },
    paymentMethod: {
        type: String,
        default: 'Razorpay',
    },
    paymentLinkId: {
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const PaymentOrder = mongoose.model('PaymentOrder', paymentOrderSchema);
export default PaymentOrder;