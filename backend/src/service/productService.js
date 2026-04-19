import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

export const calculateDiscountPercentage = (mrpPrice, sellingPrice) => {

    // if (!mrpPrice || !sellingPrice) {
    //     throw new Error("Both MRP and Selling Price are required");
    // }

    if (mrpPrice <= 0) {
        return 0;
        // throw new Error("MRP Price must be greater than zero");
    }

    if (sellingPrice > mrpPrice) {
        throw new Error("Selling price cannot exceed MRP price");
    }

    const discount = mrpPrice - sellingPrice;
    const discountPercentage = (discount / mrpPrice) * 100;
    return Math.round(discountPercentage);


}

class productService {

    async createProduct(req, seller) {
        try {
            const discountPercent = calculateDiscountPercentage(req.mrpPrice, req.sellingPrice);

            const category1 = await this.createOrGetCategory(req.category, 1);
            const category2 = await this.createOrGetCategory(req.category2, 2, category1._id);
            const category3 = await this.createOrGetCategory(req.category3, 3, category2._id);

            const product = new Product({
                title: req.title,
                description: req.description,
                mrpPrice: req.mrpPrice,
                sellingPrice: req.sellingPrice,
                images: req.images,
                discountPercent,
                seller: seller._id,
                category: category3._id,
                size: req.size,
                color: req.color,
                quantity: req.quantity,
            })

            const savedProduct = await product.save();
            return {
                message: "Product created successfully",
                product: savedProduct,
            }

        } catch (error) {
            throw new Error(`Product creation error:: ${error.message}`);
        }
    }

    async createOrGetCategory(categoryId, level, parentId = null) {
        let category = await Category.findOne({ categoryId });

        if (!category) {
            category = new Category({
                categoryId,
                level,
                parentCategory: parentId,
            });
            category = await category.save();
        }
        return category;
    };

    async deleteProduct(productId) {
        try {
            const product = await Product.findByIdAndDelete(productId);
            if (!product) {
                throw new Error("Product not found");
            }
            return { message: "Product deleted successfully" };
        } catch (error) {
            throw new Error(`Product deletion error: ${error.message}`);
        }
    }

    async updateProduct(productId, updatedproductData) {
        try {

            const product = await Product.findByIdAndUpdate(productId, updatedproductData, { new: true });
            if (!product) {
                throw new Error("Product not found");
            }
            return { message: "Product updated successfully", product };
        } catch (error) {

        }
    }

    async findProductById(productId) {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error("Product not found");
            }
            return product;
        } catch (error) {
            throw new Error(`Find product error: ${error.message}`);
        }
    }

    // async searchProducts(query) {
    //     try {
    //         const products = await Product.find({ title: new RegExp(query, 'i') });
    //         return products;
    //     } catch (error) {
    //         throw new Error(`searching error :: ${error.message}`);
    //     }
    // }

    async searchProducts(query) {
    try {
        if (!query || query.trim() === '') {
            return [];
        }

        const regex = new RegExp(query, 'i');

        // Only search by title
        const products = await Product.find({ title: regex });

        return products;
    } catch (error) {
        throw new Error(`searching error :: ${error.message}`);
    }
}


    async getProductBySeller(sellerId) {
        return await Product.find({ seller: sellerId });
    }

    async getAllProducts(req) {
        const filterQuery = {};
        if (req.category) {
            const category = await Category.findOne({ categoryId: req.category });
            if (!category) {
                return {
                    content: [],
                    totalPages: 0,
                    totalElements: 0,
                };
            }
            filterQuery.category = category._id.toString();
        }

        if (req.color) {
            filterQuery.color = req.color;
        }

        if (req.minPrice && req.maxPrice) {
            filterQuery.sellingPrice = { $gte: req.minPrice, $lte: req.maxPrice };
        }

        if (req.minDiscount) {
            filterQuery.discountPercent = { $gte: req.minDiscount };
        }

        if (req.size) {
            filterQuery.size = req.size;
        }

        let sortQuery = {};
        if (req.sort === 'price_low') {
            sortQuery.sellingPrice = 1;
        }
        else if (req.sort === 'price_high') {
            sortQuery.sellingPrice = -1;
        }

        const products = await Product.find(filterQuery).sort(sortQuery).skip((req.pageNumber * 10)).limit(10);

        const totalElements = await Product.countDocuments(filterQuery);

        const totalPages = Math.ceil(totalElements / 10);

        const response = {
            content: products,
            totalPages: totalPages,
            totalElements: totalElements,
        }

        return response;

    }
}

export default new productService();