import mongoose from 'mongoose';

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
        quantity: { type: Number },
      }],
    billNumber: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending"
    },
    assigned: {
      type: String,
      enum: ["Yes", "No"],
      default: "No"
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
