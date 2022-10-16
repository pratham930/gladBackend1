import mongoose from 'mongoose'

const locationSchema = mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true,
  },
})

// const Location = mongoose.model('Location', locationSchema)
// module.exports = Location


const Location = mongoose.model('Location', locationSchema)


export default Location;