import userRole from "../domain/userRole.js";
import VerificationCode from "../models/verificationCode.model.js";
import sellerService from "../service/sellerService.js";
import jwtProvider from "../utils/jwtProvider.js";


class SellerController {

    async getSellerProfile(req, res) {
        try {
            const profile = await req.seller;
            console.log("profile", profile);
            const jwt = req.headers.authorization.split(" ")[1];
            const seller = await sellerService.getSellerProfile(jwt);

            return res.status(200).json(seller);
        } catch (error) {
            return res.status(error instanceof Error ? 400 : 500).json({ message: error.message });
        }
    }

    async createSeller(req, res) {
        try {
            const seller = await sellerService.createSeller(req.body);
            return res.status(201).json({ message: 'Seller created successfully', seller });
        } catch (error) {
            return res.status(error instanceof Error ? 400 : 500).json({ message: error.message });
        }
    }

    async getAllSellers(req, res) {
        try {
            const sellers = await sellerService.getAllSellers(req.query.status);
            return res.status(200).json(sellers);
        } catch (error) {
            return res.status(error instanceof Error ? 400 : 500).json({ message: error.message });
        }
    }

    async updateSeller(req, res) {
        try {
            const existingSeller = await req.seller;
            const seller = await sellerService.updateSeller(existingSeller, req.body);
            return res.status(200).json({ message: 'Seller updated successfully', seller });
        } catch (error) {
            return res.status(error instanceof Error ? 400 : 500).json({ message: error.message });
        }
    }

    async deleteSeller(req, res) {
        try {
            const seller = await sellerService.deleteSeller(req.params.id);
            return res.status(200).json({ message: 'Seller deleted successfully' });
        } catch (error) {
            return res.status(error instanceof Error ? 400 : 500).json({ message: error.message });
        }
    }

    async updateSellerAccountStatus(req, res) {
        try {
            const updatedSeller = await sellerService.updateSellerStatus(req.params.id, req.params.status);
            return res.status(200).json({ message: 'Seller account status updated successfully', updatedSeller });
        } catch (error) {
            return res.status(error instanceof Error ? 400 : 500).json({ message: error.message });
        }
    }

    async verifyLoginOTP(req, res) {
        try {
            const { otp, email } = req.body;
            const seller = await sellerService.getSellerByEmail(email);

            const verificationCode = await VerificationCode.findOne({ email });

            if (!verificationCode) {
                throw new Error("Invalid OTP");
            }
            // Check if OTP is expired
            const isExpired = (Date.now() - new Date(verificationCode.createdAt).getTime()) > 10 * 60 * 1000;
            if (isExpired) {
                await VerificationCode.deleteOne({ email: cleanEmail });
                throw new Error("OTP expired, please request a new one");
            }
            if (verificationCode.otp !== otp) {
                throw new Error("Invalid OTP");
            }

            const token = jwtProvider.createJwt({ email });
            const authResponse = {
                message: 'OTP verified successfully',
                email: seller.email,
                jwt: token,
                role: userRole.SELLER,
            }
            return res.status(200).json(authResponse);

        } catch (error) {
            return res.status(error instanceof Error ? 400 : 500).json({ message: error.message });
        }
    }
}

export default new SellerController();