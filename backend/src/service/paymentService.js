import razorpay from "../config/razorpayClient.js";
import paymentStatus from "../domain/paymentStatus.js";
import Order from "../models/order.model.js";
import PaymentOrder from "../models/paymentOrder.model.js";


class PaymentService {

    async createOrder(user, orders) {
        const amount = orders.reduce((sum, order) => sum + order.totalSellingPrice, 0);

        const paymentOrder = new PaymentOrder({
            amount,
            user: user._id,
            orders: orders.map(order => order._id),
        });
        return await paymentOrder.save();
    }

    async getPaymentOrderById(orderId) {
        const paymentOrder = await PaymentOrder.findById(orderId);
        if (!paymentOrder) {
            throw new Error('Payment order not found');
        }
        return paymentOrder;
    }

    async getPaymentOrderByPaymentLinkId(paymentLinkId) {
        const paymentOrder = await PaymentOrder.findOne({ paymentLinkId });
        if (!paymentOrder) {
            throw new Error('Payment order not found');
        }
        return paymentOrder;
    }

    async createRazorpayPaymentLink(user, amount, orderId) {
        try {
            const paymentLinkRequest = {
                amount: amount * 100,
                currency: 'INR',
                customer: {
                    name: user.fullName,
                    email: user.email,
                },
                notify: {
                    email: true,
                },
                callback_url: `http://localhost:3000/api/v1/payment-success/${orderId}`,
                callback_method: 'get',
            }

            const paymentLink = await razorpay.payments.create(paymentLinkRequest);
            return paymentLink;
        } catch (error) {
            throw new Error(`Error creating Razorpay payment link: ${error.message}`);
        }
    }


    async proceedPaymentOrder(paymentOrder, paymentId, paymentLinkId) {
        if (paymentOrder.status === paymentStatus.PENDING) {
            const payment = await razorpay.payments.fetch(paymentId);

            if (payment.status === 'captured') {
                // update each orders payment status 
                await Promise.all(paymentOrder.orders.map(async (orderId) => {
                    const order = await Order.findById(orderId);
                    order.paymentStatus = paymentStatus.COMPLETED;
                    order.orderStatus = orderStatus.PLACED;
                    await order.save();
                }));

                paymentOrder.status = paymentStatus.SUCCESS;
                await paymentOrder.save();
                return { success: true, message: 'Payment successful' };
            }
            else{
                paymentOrder.status = paymentStatus.FAILED;
                await paymentOrder.save();
                return { success: false, message: 'Payment failed' };
            }
        }
        return { success: false, message: 'Payment order not found' };
    }

}

export default new PaymentService();