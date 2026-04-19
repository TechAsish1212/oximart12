import HomeCategorySection from "../domain/homeCategorySection.js"
import dealService from "./dealService.js";

class HomeService{
    async createHomePageData(allCategories){

        const gridCategories=allCategories.filter((category)=>category.section===HomeCategorySection.GRID);

        const shopByCategories=allCategories.filter((category)=>category.section===HomeCategorySection.SHOP_BY_CATEGORIES);

        const electricCategories=allCategories.filter((category)=>category.section===HomeCategorySection.ELECTRIC_CATEGORIES);

        const dealsCategories=allCategories.filter((category)=>category.section===HomeCategorySection.DEALS);

        const deals=await dealService.getDeals();

        const home={
            grid:gridCategories,
            shopByCategories:shopByCategories,
            electricCategories:electricCategories,
            deals:deals,
            dealCategories:dealsCategories
        }

        return home;
    }
}

export default new HomeService();