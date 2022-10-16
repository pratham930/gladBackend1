import mongoose from 'mongoose';
import  bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
    

const MiscellaneousSchema = new mongoose.Schema(
      {
        //name,aadhar,enter bill number,select product,quantity,cash,credit,totalAmount
        personName: {
          type: String,
          required: true,
          trim: true,
        },
        mobile: { type: Number, required: true },

        invoiceDetails: {
          type: String,
          enum: ['In', 'Out'],
          // default: "user",
        },

        billNumber: {
          type: String,
          unique: true,
          
        },

        totalAmount: {
          type: Number,
          required: true,
        },
        enterDescription: { type: String, required: true },
        addAttachment: { type: String },
        createdby: {
            type: Object,
          },
      },

      
      {
        timestamps: true,
      }
      )
      const Miscellaneous = mongoose.model('Miscellaneous', MiscellaneousSchema)

      export default Miscellaneous;