import sellerReportService from "../service/sellerReportService.js";

class SellerReportController {
    async getSellerReport(req, res) {
        try {
            const seller = await req.seller;
            const report = await sellerReportService.getSellerReport(seller._id);
            res.status(200).json(report);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new SellerReportController();