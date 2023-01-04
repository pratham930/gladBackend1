import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({

  //name,aadhar,enter bill number,select product,quantity,cash,credit,totalAmount
  name: {
    type: String,
    required: true,
    trim: true,
  },
  aadharNumber: {
    type: Number,
    required: true

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
  cash: {
    type: Number,
    required: true,
  },
  credit: {
    type: Number,

    required: true,
  },
  deliveryStatus: {
    type: String,
    enum: ["Delivered", "ToBeDelivered", "PartiallyDelivered"],
    default: "ToBeDelivered"
  },
  assigned: {
    type: String,
    enum: ["Yes", "No"],
    default: "Yes"
  },
  addAttachment: { type: String },
  createdby: {
    type: String,

    required: true,
  },

},
  {
    timestamps: true,

  },

)

const Invoice = mongoose.model('Invoice', InvoiceSchema)


export default Invoice