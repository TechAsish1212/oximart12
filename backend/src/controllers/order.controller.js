import PaymentOrder from "../models/paymentOrder.model.js";
import cartService from "../service/cartService.js";
import orderService from "../service/orderService.js";
import paymentService from "../service/paymentService.js";

class OrderController {

    async createOrder(req, res, next) {
        const { shippingAddress } = req.body;
        const { paymentMethod } = req.query;

        try {
            const user = await req.user;
            const cart = await cartService.findUserCart(user);
            const orders = await orderService.createOrder(user, shippingAddress, cart);

            const paymentOrder = await paymentService.createOrder(user, orders);

            const response={};

            if (paymentMethod === "RAZORPAY") {
                const payment = await paymentService.createRazorpayPaymentLink(
                    user, 
                    paymentOrder.amount,
                    paymentOrder._id 
                )

                response.payment_link_url=payment.short_url;
                paymentOrder.paymentLinkId=payment.id;

                await PaymentOrder.findByIdAndUpdate(paymentOrder._id,paymentOrder);
            }

            res.status(201).json(response);
        } catch (error) {
            return res.status(500).json({ message: `Error creating order: ${error.message}` });
        }
    }

    async getOrderById(req, res, next) {
        try {
            const { orderId } = req.params;
            const order = await orderService.findOrderById(orderId);
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({ message: `Error fetching order: ${error.message}` });
        }
    }

    async getOrderItemById(req, res, next) {
        try {
            const { orderItemId } = req.params;
            const orderItem = await orderService.findOrderItemById(orderItemId);
            return res.status(200).json(orderItem);
        } catch (error) {
            return res.status(500).json({ message: `Error fetching order item: ${error.message}` });
        }
    }

    async getUsersOrderHistory(req, res) {
        try {
            const userId = req.user._id.toString();
            const orderHistory = await orderService.usersOrderHistory(userId);
            return res.status(200).json(orderHistory);
        } catch (error) {
            return res.status(500).json({ message: `Error fetching order history: ${error.message}` });
        }
    }

    async getSellersOrders(req, res) {
        try {
            const sellerId = req.seller._id;
            const orders = await orderService.getSellersOrder(sellerId);
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ message: `Error fetching seller's orders: ${error.message}` });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { orderId, orderStatus } = req.params;
            const updatedOrder = await orderService.updateOrderStatus(orderId, orderStatus);
            return res.status(200).json(updatedOrder);
        } catch (error) {
            return res.status(500).json({ message: `Error updating order status: ${error.message}` });
        }
    }

    async cancelOrder(req, res) {
        try {
            const { orderId } = req.params;
            const userId = req.user._id;
            const canceledOrder = await orderService.cancelOrder(orderId, userId);
            return res.status(200).json({ message: 'Order canceled successfully', order: canceledOrder });
        } catch (error) {
            return res.status(500).json({ message: `Error canceling order: ${error.message}` });
        }
    }

}


export default new OrderController();