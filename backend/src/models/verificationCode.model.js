import mongoose from "mongoose";

const verificationCodeSchema = new mongoose.Schema({
    email: {
        type: String,       
        required: true,
    },
    otp:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, // 600 seconds = 10 minutes
    },
});

const VerificationCode = mongoose.model('VerificationCode', verificationCodeSchema);

export default VerificationCode;