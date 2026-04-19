import productService from "../service/productService.js";


class SellerProductController {
    async getProductBySellerId(req, res) {
        try {
            const seller = await req.seller;
            const products = await productService.getProductBySeller(seller._id);
            return res.status(200).json({ products });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // create product
    async createProduct(req, res) {
        try {
            // await createProductSchema.validate(req.body, { abortEarly: false });
            const seller = await req.seller;
            const product = await productService.createProduct(req.body, seller);
            return res.status(201).json({ message: "Product created successfully", product });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // delete product
    async deleteProduct(req, res) {
        try {
            await productService.deleteProduct(req.params.productId);
            return res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // update product
    async updateProduct(req, res) {
        try {
            const updatedProduct = await productService.updateProduct(req.params.productId, req.body);
            return res.status(200).json({ message: "Product updated successfully", updatedProduct });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    // get product by id
    async findProductById(req, res) {
        try {
            const product = await productService.findProductById(req.params.productId);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }   
    }

    // search products
    async searchProducts(req, res) {
        try {
            const products = await productService.searchProducts(req.query.q);
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // get all products with pagination
    async getAllProducts(req, res) {
        try {
            const response = await productService.getAllProducts(req.query);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new SellerProductController();