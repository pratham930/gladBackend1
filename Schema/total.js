import mongoose from 'mongoose';

const totalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true

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

        trim: true,
    },


},
    {
        timestamps: true,

    }
)
const total = mongoose.model('total', totalSchema)

export default total;