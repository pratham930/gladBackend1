import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const NewUserSchema = new mongoose.Schema(

    {
        phonenumber: {
            type: Number,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        Invoce: [

        ],
        role: {
            type: String,
            enum: ['costumer', 'supplier'],
            // default: "user",
        },
    },
    {
        timestamps: true,
    }
)


const NewUser = mongoose.model('NewUser', NewUserSchema)

export default NewUser;


