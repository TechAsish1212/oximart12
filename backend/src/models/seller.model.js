import mongoose from "mongoose";
import userRole from "../domain/userRole.js";
import accountStatus from "../domain/accountStatus.js";

const sellerSchema = new mongoose.Schema({
    sellerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    sellerAddress: {
        type: String,
        // required: true
    },
    businessDetails: {
        businessName: {
            type: String,
        },
        businessEmail: {
            type: String,
        },
        businessMobile: {
            type: String,
        },
        businessAddress: {
            type: String,
        },
    },
    bankDetails: {
        accountNumber: {
            type: String,
        },
        ifscCode: {
            type: String,
        },
        bankName: {
            type: String,
        },
        bankHolderName: {
            type: String,
        }
    },
    pickupAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    GSTIN: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [userRole.SELLER],
        default: userRole.SELLER,
    },
    accountStatus: {
        type: String,
        enum: [accountStatus.ACTIVE, accountStatus.PENDING_VERIFICATION, accountStatus.SUSPENDED, accountStatus.DEACTIVATED, accountStatus.BANNED, accountStatus.CLOSED],
        default: accountStatus.PENDING_VERIFICATION,
    },
},{timestamps: true})

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;