import User from "../models/user.model.js";
import Address from "../models/address.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import mongoose from "mongoose";
import orderStatus from "../domain/orderStatus.js";


class OrderService {

    async createOrder(user, shippingAddress, cart) {
        if (shippingAddress._id && !user.addresses.includes(shippingAddress._id)) {
            user.addresses.push(shippingAddress._id);
            await User.findByIdAndUpdate(user._id, user);
        }

        if (!shippingAddress._id) {
            shippingAddress = await Address.create(shippingAddress);
        }

        const itemsBySeller = cart.cartItems.reduce((acc, item) => {
            const sellerId = item.product.seller._id.toString();
            acc[sellerId] = acc[sellerId] || [];
            acc[sellerId].push(item);
            return acc;
        }, {})

        const orders = new Set();

        for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {
            const totalOrderPrice = cartItems.reduce((sum, item) => sum + item.sellingPrice,0);

            console.log("Total Order Price: ", totalOrderPrice);
            const totalItem = cartItems.length;

            const newOrder = new Order({
                user: user._id,
                seller: sellerId,
                orderItems: [],
                shippingAddress: shippingAddress._id,
                totalMrpPrice: totalOrderPrice,
                totalSellingPrice: totalOrderPrice,
                totalItem: totalItem,

            })

            const orderItems = await Promise.all(
                cartItems.map(async (cartItem) => {
                    const orderItem = new OrderItem({
                        product: cartItem.product._id,
                        quantity: cartItem.quantity,
                        sellingPrice: cartItem.sellingPrice,
                        mrpPrice: cartItem.mrpPrice,
                        size: cartItem.size,
                        userId: cartItem.userId
                    })

                    const savedOrderItem = await orderItem.save();
                    newOrder.orderItems.push(savedOrderItem._id);

                    return savedOrderItem;
                })
            )

            const savedOrder = await newOrder.save();
            orders.add(savedOrder);
        }
        return Array.from(orders);
    }


    async findOrderById(orderId) {
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new Error('Invalid order ID');
        }

        const order = await Order.findById(orderId).populate([
            { path: "seller" },
            { path: "orderItems", populate: { path: "product" } },
            { path: "shippingAddress" }
        ])

        if (!order) {
            throw new Error('Order not found');
        }

        return order;
    }

    async usersOrderHistory(userId) {
        return await Order.find({ user: userId }).populate([
            { path: "seller" },
            { path: "orderItems", populate: { path: "product" } },
            { path: "shippingAddress" }
        ])
    }

    async getSellersOrder(sellerId) {
        return await Order.findOne({ seller: sellerId }).sort({ orderDate: -1 }).populate([
            { path: "seller" },
            { path: "orderItems", populate: { path: "product" } },
            { path: "shippingAddress" }
        ])
    }


    async updateOrderStatus(orderId, status) {
        const order = await this.findOrderById(orderId);
        order.status = status;
        return await Order.findByIdAndUpdate(orderId, order, { new: true }).populate([
            { path: "seller" },
            { path: "orderItems", populate: { path: "product" } },
            { path: "shippingAddress" }
        ])

    }

    async cancelOrder(orderId, user) {
        const order = await this.findOrderById(orderId);

        if (user._id.toString() !== order.user.toString()) {
            throw new Error('You are not authorized to cancel this order');
        }

        order.status = orderStatus.CANCELED;
        return await Order.findByIdAndUpdate(orderId, order, { new: true }).populate([
            { path: "seller" },
            { path: "orderItems", populate: { path: "product" } },
            { path: "shippingAddress" }
        ])
    }

    async findOrderItemById(orderItemId) {
        if (!mongoose.Types.ObjectId.isValid(orderItemId)) {
            throw new Error('Invalid order item ID');
        }

        const orderItem = await OrderItem.findById(orderItemId).populate('product');

        if (!orderItem) {
            throw new Error('Order item not found');
        }
        return orderItem;
    }
}

export default new OrderService();