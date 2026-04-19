// import CartItem from "../models/cartItem.model.js";


// class CartItemService {
//     // Add methods related to cart items here
//     async removeCartItem(userId, cartItemId) {
//         try {
//             const cartItem = await this.findCartItemById(cartItemId);

//             if (cartItem.userId.toString() === userId._id.toString()) {
//                 await CartItem.deleteOne({ _id: cartItem._id });
//                 return { message: "Cart item removed successfully" };
//             }
//             else {
//                 throw new Error("Unauthorized to delete this cart item");
//             }
//         } catch (error) {
//             throw new Error("Error removing cart item");
//         }
//     }


//     async updateCartItem(userId, cartItemId, cartItemData) {
//         try {
//             const cartItem = await this.findCartItemById(cartItemId).populate('product');

//             if (cartItem.userId.toString() === userId._id.toString()) {
//                 const updated = {
//                     quantity: cartItemData.quantity,
//                     mrpPrice: cartItem.product.mrpPrice * cartItemData.quantity,
//                     sellingPrice: cartItem.product.sellingPrice * cartItemData.quantity,
//                 }

//                 return await CartItem.findByIdAndUpdate(cartItemId, updated, { new: true }).populate('product');
//             }
//             else {
//                 throw new Error("Unauthorized to delete this cart item");
//             }
//         } catch (error) {
//             throw new Error("Error updating cart item");
//         }
//     }

//      async findCartItemById(cartItemId) {
//         try {
//             const cartItem = await CartItem.findOne(cartItemId).populate('product');
//             if (!cartItem) {
//                 throw new Error("Cart item not found");
//             }
//             return cartItem;
//         } catch (error) {
//             throw new Error("Error finding cart item");
//         }
//     }
// }

// export default new CartItemService();

import CartItem from "../models/cartItem.model.js";

class CartItemService {
    async removeCartItem(userId, cartItemId) {
        try {
            const cartItem = await this.findCartItemById(cartItemId);

            if (cartItem.userId.toString() === userId._id.toString()) {
                await CartItem.deleteOne({ _id: cartItem._id });
                return { message: "Cart item removed successfully" };
            } else {
                throw new Error("Unauthorized to delete this cart item");
            }
        } catch (error) {
            throw new Error("Error removing cart item");
        }
    }

    async updateCartItem(userId, cartItemId, cartItemData) {
        try {
            const cartItem = await this.findCartItemById(cartItemId);

            if (cartItem.userId.toString() === userId._id.toString()) {
                const updated = {
                    quantity: cartItemData.quantity,
                    mrpPrice: cartItem.product.mrpPrice * cartItemData.quantity,
                    sellingPrice: cartItem.product.sellingPrice * cartItemData.quantity,
                };

                return await CartItem.findByIdAndUpdate(
                    cartItemId,
                    updated,
                    { new: true }
                ).populate('product');
            } else {
                throw new Error("Unauthorized to update this cart item");
            }
        } catch (error) {
            throw new Error("Error updating cart item");
        }
    }

    async findCartItemById(cartItemId) {
        try {
            const cartItem = await CartItem.findById(cartItemId).populate('product');
            if (!cartItem) {
                throw new Error("Cart item not found");
            }
            return cartItem;
        } catch (error) {
            throw new Error("Error finding cart item");
        }
    }
}

export default new CartItemService();
