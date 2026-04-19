import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    locality: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    mobile: {
        type: String,
    },
    pinCode: {
        type: String,
    },
    address: {
        type: String,
    },
},{timestamps: true})

const Address = mongoose.model('Address', addressSchema);

export default Address;