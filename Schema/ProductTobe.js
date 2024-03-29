import mongoose from 'mongoose';

const productSchemas = mongoose.Schema({
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


},
    {
        timestamps: true,

    }
)

const AllProduct = mongoose.model('AllProduct', productSchemas)

export default AllProduct;
