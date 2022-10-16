import mongoose from 'mongoose';
import  bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
    

const DepositeSchema = new mongoose.Schema(
      {
        //name,aadhar,enter bill number,select product,quantity,cash,credit,totalAmount
        costumerName: {
          type: String,
          required: true,
          trim: true,
        },
        // mobile: { type: Number, required: true },
        aadharNumber: {
            type: Number,
            required: true,
            unique: true,
          },

        // invoiceDetails: {
        //   type: String,
        //   enum: ['In', 'Out'],
        //   // default: "user",
        // },

        billNumber: {
          type: String,
          unique: true,
          
        },
        DepositebillNumber: {
            type: String,
            unique: true,
            
          },

 cash: {
          type: Number,
          required: true,
        },
        credit: {
            type: Number,
            required: true,
          },
        totalAmount: {
          type: Number,
          required: true,
        },
        // enterDescription: { type: String, required: true },
        addAttachment: { type: String },
        createdby: {
            type: Object,
          },
      },

      
      {
        timestamps: true,
      }
      )
      const Deposit = mongoose.model('Deposit', DepositeSchema)

      export default Deposit;