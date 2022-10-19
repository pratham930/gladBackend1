import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const rgisterSchema = new mongoose.Schema(
  {
    phonenumber: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    memberId: {
      type: String,

    },
    password: { type: String },
    // pimage: { type: String },
    role: {
      type: String,
      enum: ['staff', 'admin', 'seller']
      // default: "user",
    },


  },
  {
    timestamps: true,
  }
)

rgisterSchema.pre('save', async function (next) {
  console.log("hii pre");
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12)
    // this.confrimPassword = await bcrypt.hash(this.password,12)
  }
  next();
})

const Registration2 = mongoose.model('Registration2', rgisterSchema)
export default Registration2;

