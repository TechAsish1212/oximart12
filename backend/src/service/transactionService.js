import Order from "../models/order.model.js";
import Seller from "../models/seller.model.js";
import Transaction from "../models/Transaction.model.js";

class TransactionService {
    // create a new transaction from an order

    async createTransaction(orderId) {
        // Find the order by Id
        const order = await Order.findById(orderId).populate('seller');
        if (!order) {
            throw new Error("Order not found");
        }

        const seller = await Seller.findById(order.seller._id);
        if (!seller) {
            throw new Error("Seller not found");
        }

        // Create new transaction
        const transaction = new Transaction({
            seller: seller._id,
            customer: order.user,
            order: order._id,
        })

        // save and return the transaction
        return await transaction.save();
    }

    // get the transactions by seller Id
    async getTransactionsBySellerId(sellerId) {
        return await Transaction.find({ seller: sellerId }).populate('order');
    }

    // Get all transactions
    async getAllTransactions() {
        return await Transaction.find().populate('seller order customer');
    }
}

export default new TransactionService(); 