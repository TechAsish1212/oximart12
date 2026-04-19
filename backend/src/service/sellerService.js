import Address from "../models/address.model.js";
import Seller from "../models/seller.model.js";
import jwtProvider from "../utils/jwtProvider.js";
import bcrypt from 'bcryptjs';


class SellerService {

    async createSeller(sellerData) {
        const existingSeller = await Seller.findOne({
            $or: [
                { sellerEmail: sellerData.email },
                { mobile: sellerData.mobile }
            ]
        });
        if (existingSeller) {
            throw new Error('Seller already exists');
        }

        let savedAddress = sellerData.pickupAddress;
        savedAddress = await Address.create(sellerData.pickupAddress);

        const hashedPassword = await bcrypt.hash(sellerData.password, 10);

        const newSeller = new Seller({
            sellerName: sellerData.sellerName,
            email: sellerData.email,
            password: hashedPassword,
            pickupAddress: savedAddress._id,
            GSTIN: sellerData.GSTIN,
            mobile: sellerData.mobile,
            bankDetails: sellerData.bankDetails,
            businessDetails: sellerData.businessDetails,
        });
        await newSeller.save();
        return newSeller;
    }

    async getSellerProfile(jwt) {
        const email = jwtProvider.getEmailFromJwt(jwt);
        return this.getSellerByEmail(email);
    }

    async getSellerByEmail(email) {
        const seller = await Seller.findOne({ email })
        if (!seller) {
            throw new Error('Seller not found');
        }
        return seller;
    }

    async getSellerById(id) {
        const seller = await Seller.findById(id);
        if (!seller) {
            throw new Error('Seller not found');
        }
        return seller;
    }

    async getAllSellers(status) {
        return await Seller.find({ accountStatus: status });
    }

    async updateSeller(existingSeller, sellerData) {
        return await Seller.findByIdAndUpdate(existingSeller._id, sellerData, { new: true });
    }

    async updateSellerStatus(sellerId, status) {
        return await Seller.findByIdAndUpdate(
            sellerId,
            { $set: { accountStatus: status } },
            { new: true }
        );
    }

    async deleteSeller(sellerId) {
        return await Seller.findByIdAndDelete(sellerId);
    }

}

export default new SellerService();