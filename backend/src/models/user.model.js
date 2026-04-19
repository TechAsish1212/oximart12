import mongoose from 'mongoose';
import userRole from '../domain/userRole.js';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    mobile:{
        type: String,
        // required: true, 
    },
    role:{
        type: String,
        enum: [userRole.CUSTOMER,userRole.ADMIN],    
        default: userRole.CUSTOMER,
    },
    address:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address',
        },
    ]
});

const User = mongoose.model('User', userSchema);    
export default User;