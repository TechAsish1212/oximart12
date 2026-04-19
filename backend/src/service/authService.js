// import Seller from "../models/seller.model.js";
// import VerificationCode from "../models/verificationCode.model.js";
// import { generateOtpEmailTemplate } from "../utils/generateEmailTemplate.js";
// import generateOTP from "../utils/generateotp.js";
// import sendVerificationEmail from "../utils/sendEmail.js";

// class AuthService {
//     async sendLoginOTP(email) {

//         const SIGININ_PREFIX = 'signin_';
//         if (email.startsWith(SIGININ_PREFIX)) {
//             const seller = await Seller.findOne({ email });
//             if (!seller) {
//                 throw new Error('User not found');
//             }
//         }

//         const existingVerificationCode = await VerificationCode.findOne({ email });
//         if (existingVerificationCode) {
//             await VerificationCode.deleteOne({ email });
//         }

//         const otp = generateOTP();
//         const verificationCode = new VerificationCode({ email, otp });
//         await verificationCode.save();

//         // send  otp to user email
//         const subject = "Your Login/Signin OTP for OxiMart";
//         const body = generateOtpEmailTemplate(Seller.sellerName, otp);
//         await sendVerificationEmail(email, subject, body);

//         return { message: 'OTP sent to email successfully' };
//     }
// }

// export default new AuthService();

import Cart from "../models/cart.model.js";
import Seller from "../models/seller.model.js";
import User from "../models/user.model.js";
import VerificationCode from "../models/verificationCode.model.js";
import { generateOtpEmailTemplate } from "../utils/generateEmailTemplate.js";
import generateOTP from "../utils/generateotp.js";
import jwtProvider from "../utils/jwtProvider.js";
import sendVerificationEmail from "../utils/sendEmail.js";
import bcrypt from 'bcrypt';
import userService from "./userService.js";

class AuthService {

    // Send login OTP to user email
    async sendLoginOTP(email) {
        const SIGNIN_PREFIX = 'signin_';
        let cleanEmail = email;
        let sellerName = "User";

        if (email.startsWith(SIGNIN_PREFIX)) {
            cleanEmail = email.replace(SIGNIN_PREFIX, '');

            const seller = await Seller.findOne({ email: cleanEmail });
            const user = await User.findOne({ email: cleanEmail });
            if (!seller && !user) {
                throw new Error('User not found');
            }

            if (seller) {
                sellerName = seller.sellerName || "Seller";
            } else if (user) {
                sellerName = user.name || "User";
            }
        }

        const existingVerificationCode = await VerificationCode.findOne({ email: cleanEmail });
        if (existingVerificationCode) {
            await VerificationCode.deleteOne({ email: cleanEmail });
        }

        const otp = generateOTP();

        const verificationCode = new VerificationCode({ email: cleanEmail, otp });
        await verificationCode.save();

        const subject = "Your Login/Signin OTP for OxiMart";
        const body = generateOtpEmailTemplate(sellerName, otp);
        await sendVerificationEmail(cleanEmail, subject, body);

        return { message: 'OTP sent to email successfully' };
    }

    // create user
    async createUser({ email, fullName, otp }) {
        let user = await User.findOne({ email });
        if (user)
            throw new Error("User already exists");

        const verificationCode = await VerificationCode.findOne({ email });
        if (!verificationCode || verificationCode.otp !== otp) {
            throw new Error("Invalid OTP...");
        }

        const hashPass = await bcrypt.hash("12345678", 10);

        user = new User({
            name: fullName,
            email,
            password: hashPass,
        });

        await user.save();

        const cart = new Cart({ user: user._id });
        await cart.save();

        // Optionally delete OTP record after use
        await VerificationCode.deleteOne({ email });

        return jwtProvider.createJwt({ email });
    }

    // signin user
    async signinUser(req) {
        const { email, otp } = req;

        console.log("BODY RECEIVED:", req.body);

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found with this email');
        }

        const verificationCode = await VerificationCode.findOne({ email });

        if (!verificationCode || verificationCode.otp !== otp) {
            throw new Error('Invalid OTP');
        }

        await VerificationCode.deleteOne({ email });

        return {
            message: 'User signed in successfully',
            token: jwtProvider.createJwt({ email }),
            user: {
                name: user.name,
                role: user.role,
            }
        }

    }
}

export default new AuthService();
