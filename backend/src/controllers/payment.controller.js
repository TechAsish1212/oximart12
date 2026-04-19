import Cart from "../models/cart.model.js";
import orderService from "../service/orderService.js";
import paymentService from "../service/paymentService.js";
import sellerReportService from "../service/sellerReportService.js";
import sellerService from "../service/sellerService.js";
import transactionService from "../service/transactionService.js";


class paymentController{

    async paymentSuccessHandler(req, res){
    const { paymentId } = req.params;
    const { paymentLinkId } = req.query;

    try {
        // get the user from jwt token
        const user = await req.user;

        const paymentOrder = await paymentService.getPaymentOrderByPaymentLinkId(paymentLinkId);

        const paymentSuccess = await paymentService.proceedPaymentOrder(paymentOrder, paymentId, paymentLinkId);

        if (paymentSuccess) {
            for (let orderId of paymentOrder.orders) {
                const order = await orderService.findOrderById(orderId);

                // create transaction for the order
                await transactionService.createTransaction(order);

                // Get seller and update seller report
                const seller = await sellerService.getSellerById(order.seller);
                const sellerReport = await sellerReportService.getSellerReport(seller);

                // update the seller report 
                sellerReport.totalOrders += 1;
                sellerReport.totalEarnings += order.totalSellingPrice;
                sellerReport.totalSales += order.orderItems.length;

                const updateReport = await sellerReportService.updateSellerReport(sellerReport);
                console.log("update report: " + updateReport);
            }

            await Cart.findOneAndUpdate(
                { user: user._id },
                { cartItems: [] },
                { new: true },
            )

            return res.status(201).json({ sucess: true, message: "Payment Successful" });
        }
        else {
            return res.status(400).json({ sucess: false, message: "Payment failed" });
        }

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

}

export default new paymentController();

// export const paymentSuccessHandler = async (req, res) => {
//     const { paymentId } = req.params;
//     const { paymentLinkId } = req.query;

//     try {
//         // get the user from jwt token
//         const user = await req.user;

//         const paymentOrder = await paymentService.getPaymentOrderByPaymentLinkId(paymentLinkId);

//         const paymentSuccess = await paymentService.proceedPaymentOrder(paymentOrder, paymentId, paymentLinkId);

//         if (paymentSuccess) {
//             for (let orderId of paymentOrder.orders) {
//                 const order = await orderService.findOrderById(orderId);

//                 // create transaction for the order
//                 await transactionService.createTransaction(order);

//                 // Get seller and update seller report
//                 const seller = await sellerService.getSellerById(order.seller);
//                 const sellerReport = await sellerReportService.getSellerReport(seller);

//                 // update the seller report 
//                 sellerReport.totalOrders += 1;
//                 sellerReport.totalEarnings += order.totalSellingPrice;
//                 sellerReport.totalSales += order.orderItems.length;

//                 const updateReport = await sellerReportService.updateSellerReport(sellerReport);
//                 console.log("update report: " + updateReport);
//             }

//             await Cart.findOneAndUpdate(
//                 { user: user._id },
//                 { cartItems: [] },
//                 { new: true },
//             )

//             return res.status(201).json({ sucess: true, message: "Payment Successful" });
//         }
//         else {
//             return res.status(400).json({ sucess: false, message: "Payment failed" });
//         }

//     } catch (error) {
//         return res.status(500).json({message:error.message});
//     }
// }

// export default new paymentSuccessHandler();