// import registration from "../Schema/Registration.js";
// import  bcrypt from "bcryptjs";
// import jwt from 'jsonwebtoken';
import Product from "../Schema/Products.js"
import Expances from '../Schema/expances.js';
import Invoice from '../Schema/costumersInvoice.js'
import Miscellaneous from '../Schema/Miscellaneous.js';
import Deposite from '../Schema/deposite.js';
import StoreInvoice from '../Schema/storeInvoice.js';
import AllProduct from "../Schema/ProductTobe.js";
// import Registration2 from "../Schema/Registration2.js";


class sellerController {



  static getLocation = async (req, res) => {
    const locations = await Location.find({})
    res.json(locations)
  }



  static updateCostumersInvoice = async (req, res) => {

    try {
      const {
        name,
        aadharNumber,
        billNumber,
        totalAmount,
        cash,
        credit

      } = req.body

      var products = JSON.parse(req.body.products)

      for (let index = 0; index < products.length; index++) {
        const element1 = products[index].selectProduct;
        const element2 = products[index].quantity;
        const userProduct = await AllProduct.findOne({ name: element1 })

        let oldToBeDelivered = userProduct.ToBeDelivered
        let oldDelivered = userProduct.Delivered
        let ToBeDelivered = oldToBeDelivered ? oldToBeDelivered - element2 : element2
        let Delivered = oldDelivered ? oldDelivered + element2 : element2

        const userNewProduct = await AllProduct.findOneAndUpdate({ name: element1 }, { $set: { ToBeDelivered, Delivered } })

      }
      const sita = () => {
        let ramu = []
        for (let index = 0; index < productLocation.length; index++) {
          const element1 = productLocation[index].name;
          const element2 = productLocation[index].quantity;
          const element3 = productLocation[index]._id;
          const raja = products.map((e, i) => {
            if (element1 === e.selectProduct) {
              const u = { name: e.selectProduct, quantity: e.quantity + element2, _id: element3 }
              ramu.push(u)
            }
            else {
              return { ...ramu, e }
            }
          }
          )

        }
        return ramu
      }
      console.log(sita(), "message")

      for (let index = 0; index < sita().length; index++) {
        const element = sita()[index]._id;
        const newQuantity = sita()[index].quantity;

        await Product.findByIdAndUpdate(element, { $set: { quantity: newQuantity } })
        if (sita().length - 1 == index) {
          res.send({ "status": "success", "message": "location vice products  updated succesfully" })

        }
      }


      const addAttachment = req.files['addAttachment'][0].filename
      if (!totalAmount || !name || !billNumber) {
        res.send({ status: 'failed', message: 'All Fields are Required' })
      }
      else {
        const lol = {
          name,
          aadharNumber,
          products,
          billNumber,
          totalAmount,
          addAttachment,
          cash,
          credit,
          createdby: req.user._id
        }
        const invoice = new Invoice(lol)
        await invoice.save()
        console.log(invoice)
        res.json({ status: 'success', message: 'costumersInvoice saved' })
      }

    } catch (error) {
      console.log(error)
      return res.status(422).send(error)
    }
  }


  static getAllInvioces = async (req, res) => {

    const expances = await Expances.find({})
    const invoice = await Invoice.find({})
    const miscellaneous = await Miscellaneous.find({})
    const deposite = await Deposite.find({})
    const storeInvoice = await StoreInvoice.find({})
    const invoices = { ...invoice, ...storeInvoice }

    res.json(invoice)
  }



}


export default sellerController;