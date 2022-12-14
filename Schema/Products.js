import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,

  },
  quantity: {
    type: Number,
    required: true,
  },

  Remainingquantity: {
    type: Number,
    // required: true,
  },
  ToBeDelivered: {
    type: Number,
    // required: true,
  },
  Delivered: {
    type: Number,
    // required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },


},
  {
    timestamps: true,

  }
)

const Product = mongoose.model('Product', productSchema)

export default Product;
