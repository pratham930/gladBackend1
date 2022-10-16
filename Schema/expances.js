import mongoose from 'mongoose'

const ExpanceSchema = new mongoose.Schema(
  {
    //name,aadhar,enter bill number,select product,quantity,cash,credit,totalAmount
    description: {
      type: String,
      required: true,
      trim: true,
    },
  
    selectCategoty: {
      type: String,
    },
    
    createdby: {
        type: Object,
      },

    billNumber: {
      type: String,
      unique: true,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    addAttachment: { type: String },
  },
  {
    timestamps: true,
  }
)

const Expances = mongoose.model('Expances', ExpanceSchema)

export default Expances
