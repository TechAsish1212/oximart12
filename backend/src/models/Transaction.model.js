import mongoose from "mongoose";

const TransactionSchema=new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true,
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Seller',
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const Transaction=mongoose.model('Transaction',TransactionSchema);
export default Transaction;