import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
const { Schema } = mongoose;
import jwt from "jsonwebtoken";
import Invoice from './costumersInvoice.js';

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
        // Invoce: [

        // ],

        Invoces: [
            { type: Schema.Types.ObjectId, ref: 'Invoice' },
            // { type: Schema.Types.ObjectId, ref: 'Miscellaneous' },
            // { type: Schema.Types.ObjectId, ref: 'Deposit' },
            // { type: Schema.Types.ObjectId, ref: 'Expances' }
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


