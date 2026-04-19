import cartItemService from "../service/cartItemService.js";
import cartService from "../service/cartService.js";
import productService from "../service/productService.js";


class CartController {
    async findUserCartHandler(req, res) {
        try {
            const user = await req.user;
            const cart = await cartService.findUserCart(user);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addItemToCartHandler(req, res) {
        try {
            const user = await req.user;
            const product=await productService.findProductById(req.body.productId);
            const cartItem = await cartService.addCartItem(user, product, req.body.size, req.body.quantity);
            res.status(200).json(cartItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCartItemHandler(req, res) {
        try {
            const user = await req.user;
            await cartItemService.removeCartItem(user._id, req.params.cartItemId);
            res.status(200).json({ message: "Cart item removed successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCartItemHandler(req, res) {
        try {
            const cartItemId=req.params.cartItemId;
            const { quantity } = req.body;
            const user = await req.user;
            let updateCartItem;
            if(quantity>0){
                updateCartItem=await cartItemService.updateCartItem(user._id, cartItemId, { quantity });
            }
            res.status(200).json(updateCartItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default new CartController();