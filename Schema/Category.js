import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    category: {
    type: String,
    required: true,
    trim: true,
  },
})

// const Location = mongoose.model('Location', locationSchema)
// module.exports = Location


const Category = mongoose.model('Category', categorySchema)


export default Category;