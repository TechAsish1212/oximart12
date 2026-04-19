import SellerReport from "../models/sellerReport.model.js";

class sellerReportService {

    async getSellerReport(seller) {
        try {
            let sellerReport = await SellerReport.findOne({ seller: seller._id });
            console.log("Seller Report : ", sellerReport);

            // if the report doesn't exists,create new one
            if (!sellerReport) {
                sellerReport = new SellerReport({
                    seller: seller._id,
                    totalOrders: 0,
                    totalEarnings: 0,
                    totalSales: 0,
                })

                sellerReport = await sellerReport.save();
            }
            return sellerReport;
        } catch (error) {
            throw new Error(`Error fetching seller report:: ${error.message}`);
        }
    }

    async updateSellerReport(sellerReport) {
        try {

            // update and save the seller report
            return await SellerReport.findByIdAndUpdate(sellerReport._id, sellerReport, { new: true })
        }catch(err){
            throw new Error(`Error updating seller report:${err.message}`);
        }
    }
}

export default new sellerReportService();
