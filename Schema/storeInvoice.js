import mongoose from 'mongoose'

const StoreSchema = new mongoose.Schema(
  {
    //name,aadhar,enter bill number,select product,quantity,cash,credit,totalAmount
    supplierName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfExportation: {
      type: Date,
      required: true,
    },

    selectProduct: {
      type: Object,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    products: [
      {
        selectProduct: { type: String },
        quantity: { type: Number, required: true },
      }],
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

const StoreInvoice = mongoose.model('StoreInvoice', StoreSchema)

export default StoreInvoice
