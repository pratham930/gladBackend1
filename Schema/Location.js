import mongoose, { Schema } from 'mongoose';


const locationSchema = mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
})
product: [
  { type: Schema.Types.ObjectId, ref: 'Product', unique: true }
]

// const Location = mongoose.model('Location', locationSchema)
// module.exports = Location


const Location = mongoose.model('Location', locationSchema)


export default Location;