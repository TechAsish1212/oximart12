import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";
import { calculateDiscountPercentage } from "./productService.js";


class cartService {

    async findUserCart(user) {
        try {
            let cart = await Cart.findOne({ user: user._id });

            let totalPrice = 0;
            let totalDiscountedPrice = 0;
            let totalItem = cart.cartItems.length;

            cart.cartItems.forEach(item => {
                totalPrice += item.mrpPrice;
                totalDiscountedPrice += item.sellingPrice;
            });

            cart.totalMrpPrice = totalPrice;
            cart.totalSellingPrice = totalDiscountedPrice;
            cart.discount = calculateDiscountPercentage(totalPrice, totalDiscountedPrice);
            cart.totalItem = totalItem;

            let cartItems = await CartItem.find({ cart: cart._id }).populate('product');
            cart.cartItems = cartItems;

            return cart;

        } catch (error) {
            throw new Error('Error fetching cart items: ' + error.message);
        }
    }

    async addCartItem(user, product, size, quantity) {
        try {
            const cart = await this.findUserCart(user);

            let isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, size: size }).populate('product');

            if (!isPresent) {
                const cartItem = new CartItem({
                    cart: cart._id,
                    product: product._id,
                    size: size,
                    quantity: quantity,
                    mrpPrice: product.mrpPrice * quantity,
                    sellingPrice: product.sellingPrice * quantity,
                    userId: user._id,
                });
                return await cartItem.save();
            }
            return isPresent;
        } catch (error) {
            throw new Error('Error adding item to cart: ' + error.message);
        }
    }
}


export default new cartService();