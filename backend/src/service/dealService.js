import Deal from "../models/deal.model.js";
import HomeCategory from "../models/homeCategory.model.js";

class DealService {

    // get all the deals
    async getDeals() {
        return await Deal.find().populate({ path: "category" });
    }

    // create deals
    async createDeals(deal) {
        try {
            const category = await HomeCategory.findById(deal.category._id);
            const newDeal = new Deal({
                ...deal,
                category: category,
            })

            const savedDeal = await newDeal.save();
            return await Deal.findById(savedDeal._id).populate({ path: "category" });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // update deals
    async updateDeal(deal, id) {
        const existingDeal = await HomeCategory.findById(id).populate({ path: "category" });
        if (existingDeal) {
            return await Deal.findByIdAndUpdate(existingDeal._id, { discount: deal.discount }, { new: true })
        }
        throw new Error("Deal Not Found");
    }

    // Delete deals
    async deleteDeals(id) {
        const deal = await Deal.findById(id);
        if (!deal) {
            throw new Error('Deal not found');
        }
        await Deal.deleteOne({ _id: id })
    }
}

export default new DealService();