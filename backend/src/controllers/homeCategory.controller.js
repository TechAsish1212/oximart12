import homeCategoryService from "../service/homeCategoryService.js";

class HomeCategoryController {
    // create Home categories
    async createHomeCategories(req, res) {
        try {
            const homeCategories = req.body;
            const categories = await homeCategoryService.createCategories(homeCategories);
            // const home=await homeCategoryService.createHomePageData(categories);
            return res.status(202).json(categories);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Get all home categories
    async getHomeCategory(req, res) {
        try {
            const categories = await homeCategoryService.getAllHomeCategories();
            return res.status(202).json(categories);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // update home category
    async updateHomeCategory(req, res) {
        try {
            const id = req.body.params;
            const homeCategory = req.body;
            const updateCategory = await homeCategoryService.updateHomeCategory(homeCategory, id);
            return res.status(200).json(updateCategory);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new HomeCategoryController();