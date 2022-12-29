// import registration from '../Schema/Registration.js'
import Product from '../Schema/Products.js';
import Invoice from '../Schema/costumersInvoice.js';
import StoreInvoice from '../Schema/storeInvoice.js';
import Registration2 from '../Schema/Registration2.js';
import Expances from "../Schema/expances.js";
import Category from "../Schema/Category.js";
import Location from "../Schema/Location.js";
import Miscellaneous from '../Schema/Miscellaneous.js';
import Deposite from '../Schema/deposite.js';


// process.env.SECRET_KEY
// import  bcrypt from "bcryptjs";

// import authenticate from "../middleware/authenticate.js";
// import jwt from 'jsonwebtoken';
// import  twilio from 'twilio';
// const client = new twilio(process.env.accountSid, process.env.authToken);

class staffController {



  static costumersInvoice = async (req, res) => {
    try {
      const {
        name,
        aadharNumber,


        billNumber,
        totalAmount,
        cash,
        credit,
      } = req.body

      // var products = JSON.parse(req.body.products)

      console.log(req.body)
      var products = JSON.parse(req.body.products)

      for (let index = 0; index < products.length; index++) {
        const element1 = products[index].selectProduct;
        const element2 = products[index].quantity;


        console.log(element1, "74")
        console.log(element2, "75")


        const userProduct = await Product.findOne({ name: element1 })
        console.log(userProduct, 80)
        console.log(userProduct.quantity - element2, "80")
        console.log(userProduct.ToBeDelivered, "80")
        let oldToBeDelivered = userProduct.ToBeDelivered
        let oldRemainingquantity = userProduct.Remainingquantity

        let ToBeDelivered = oldToBeDelivered ? oldToBeDelivered + element2 : element2
        let newQuantity = oldRemainingquantity > 0 ? oldRemainingquantity - element2 : userProduct.quantity - element2

        // let newQuantity = userProduct.quantity > 0 ? userProduct.quantity - element2 : 0

        const userNewProduct = await Product.findOneAndUpdate({ name: element1 }, { $set: { Remainingquantity: newQuantity, ToBeDelivered } })
      }
      const addAttachment = req.files['addAttachment'][0].filename


      const lol = {
        name,
        aadharNumber,
        products,
        billNumber,
        totalAmount,
        addAttachment,
        cash,
        credit,
        createdby: req.user._id,
      }
      const invoice = new Invoice(lol)
      await invoice.save()
      console.log(invoice)
      res.send({ status: 'success', message: 'costumersInvoice saved' })
      //  }
    } catch (error) {
      console.log(error)
      return res.status(422).json({ error: 'not found data' })
    }
  }




  static storeInvoice = async (req, res) => {


    try {
      const {
        supplierName,
        dateOfExportation,
        location,


        billNumber,
        totalAmount
      } = req.body
      var products = JSON.parse(req.body.products)
      console.log(req.body, '101')
      for (let index = 0; index < products.length; index++) {
        const element1 = products[index].selectProduct;
        const element2 = products[index].quantity;
        console.log(element1, "74")
        console.log(element2, "75")



        const userProduct = await Product.findOne({ name: element1 })

        console.log(userProduct, 80)
        console.log(userProduct.quantity - element2, "80")
        let oldToBeDelivered = userProduct.ToBeDelivered
        let oldRemainingquantity = userProduct.Remainingquantity

        let ToBeDelivered = oldToBeDelivered ? oldToBeDelivered + element2 : element2
        let newQuantity = oldRemainingquantity > 0 ? oldRemainingquantity - element2 : userProduct.quantity - element2
        // let newQuantity = userProduct.quantity > 0 ? userProduct.quantity - element2 : 0
        const userNewProduct = await Product.findOneAndUpdate({ name: element1 }, { $set: { Remainingquantity: newQuantity, ToBeDelivered } })
        // console.log(userNewProduct, "85")
      }


      const addAttachment = req.files['addAttachment'][0].filename

      console.log(addAttachment, "130")
      if (!totalAmount || !supplierName) {
        res.send({ status: 'failed', message: 'All Fields are Required' })
      }


      else {
        const lol = {
          supplierName,
          location,
          products,
          billNumber,
          totalAmount,
          dateOfExportation,
          addAttachment,
          createdby: req.user._id
        }

        const storeinvoice = new StoreInvoice(lol)
        await storeinvoice.save()

        res.send({ status: 'success', message: 'costumersInvoice saved' })
      }


      //  }
    } catch (error) {
      console.log(error)
      return res.status(422).json({ error: 'not found data' })
    }
  }




  static addLoaction = async (req, res) => {
    const location = new Location(req.body)
    try {
      await location.save()
      res.status(201).send(location)
    } catch (err) {
      res.status(400).send(err)
    }
    console.log(req.body)
    res.send(req.body)
  };


  static addExpances = async (req, res) => {
    const addAttachment = req.files['addAttachment'][0].filename
    try {
      console.log(req.body, '182')
      console.log(addAttachment, '183')

      let lol = { ...req.body, createdby: req.user._id, addAttachment }
      const expances = new Expances(lol)

      const ram = await expances.save()
      console.log(ram, '189')
      res.send({ status: "success" })
    } catch (err) {
      res.status(400).send(err)
    }
    // console.log(expances)

  };

  static addDeposite = async (req, res) => {
    const addAttachment = req.files['addAttachment'][0].filename
    const { billNumber, DepositebillNumber, cash, credit } = req.body

    try {
      let lol = { ...req.body, createdby: req.user._id, addAttachment }

      const userProduct = await Invoice.findOne({ billNumber })

      if (userProduct) {
        console.log(userProduct.credit)

        let NewCredit = userProduct.credit >= cash ? userProduct.credit - cash : 0
        const userNewProduct = await Invoice.findOneAndUpdate({ billNumber: billNumber }, { $set: { credit: NewCredit } })
        console.log(userNewProduct, 'deposite succesfull');
      }
      const deposite = new Deposite(lol)

      await deposite.save()
      res.send({ status: "success" })
    } catch (err) {
      res.status(400).send(err)
    }
    // console.log(deposite)

  };


  // static addDeposite = async (req, res) => {
  //   const addAttachment = req.files['addAttachment'][0].filename

  //   const { billNumber, DepositebillNumber, cash, credit } = req.body

  //   // // Invoice
  //   // const userProduct = await Invoice.findOne({ billNumber })
  //   console.log(req.body)

  //   let lol = { ...req.body, createdby: req.user._id, addAttachment }
  //   try {
  //     const deposite = new Deposite(lol)

  //     await deposite.save()
  //     res.send(deposite, { status: "success" })
  //     console.log(deposite, '208')

  //   } catch (err) {
  //     res.status(400).send(err)
  //   }
  //   // console.log(deposite)

  // };




  static addmiscellaneous = async (req, res) => {
    const addAttachment = req.files['addAttachment'][0].filename
    let lol = { ...req.body, createdby: req.user._id, addAttachment }
    const miscellaneous = new Miscellaneous(lol)
    try {
      await miscellaneous.save()
      res.status(201).send(miscellaneous, { status: "success" })
    } catch (err) {
      res.status(400).send(err)
    }
    console.log(miscellaneous)

  };



  static getLocation = async (req, res) => {
    const locations = await Location.find({})
    res.send(locations)
  };

  static getProduct = async (req, res) => {
    const product = await Product.find({})
    res.send(product)
  };

  static getcategory = async (req, res) => {
    const category = await Category.find({})
    res.json(category)
  }


  static getPofile = async (req, res) => {
    console.log(`hello about page`);
    // console.log(req.user.role,"529")

    res.send({ "user": req.user })
  };

  // static about = async (req,res)=>{
  //   console.log(`hello about page`);
  //   console.log(req.user.role,"529")
  //   res.send({"user":req.user}) 
  // }
  // static login = async (req, res) => {
  //   const { phonenumber } = req.body
  //   const newPhoneNumber = '+91' + phonenumber
  //   var params = {
  //     template: 'Your Login OTP is %token',
  //     timeout: 300,
  //   }

  //   messagebird.verify.create(newPhoneNumber, params, (err, response) => {
  //     if (err) {
  //       // Could not send OTP e.g. Phone number Invalid
  //       console.log('OTP Send Error:', err)
  //       res
  //         .status(200)
  //         .send({ status: 'failed', message: 'Unable to Send OTP' })
  //     } else {
  //       // OTP Send Success
  //       console.log('OTP Send Response:', response)
  //       res.status(200).send({
  //         status: 'success',
  //         message: 'OTP Send Successfully',
  //         id: response.id,
  //       })
  //     }
  //   })
  // };

  // static verifyOTP = async (req, res) => {
  //   const { id, otpcode } = req.body
  //   messagebird.verify.verify(id, otpcode, (err, response) => {
  //     if (err) {
  //       // Incorrect OTP
  //       console.log('OTP Verification Error:', err)
  //       res.status(200).send({ status: 'failed', message: 'Invalid OTP' })
  //     } else {
  //       // Login Success
  //       console.log('OTP Verification Response:', response)
  //       res.status(200).send({ status: 'success', message: 'Login Success' })
  //     }
  //   })
  // }
}

export default staffController;
