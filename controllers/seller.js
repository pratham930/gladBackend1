// import registration from "../Schema/Registration.js";
// import  bcrypt from "bcryptjs";
// import jwt from 'jsonwebtoken';
import Expances from '../Schema/expances.js';
import Invoice from '../Schema/costumersInvoice.js'
import Miscellaneous from '../Schema/Miscellaneous.js';
import Deposite from '../Schema/deposite.js';
// import Registration2 from "../Schema/Registration2.js";


class sellerController {



  static getLocation = async (req, res) => {
    const locations = await Location.find({})
    res.json(locations)
  }


  static getAllInvoces = async (req, res) => {

    const expances = await Expances.find({})
    const invoice = await Invoice.find({})
    const miscellaneous = await Miscellaneous.find({})
    const deposite = await Deposite.find({})

    const invoices = { ...expances, ...invoice, ...miscellaneous, ...deposite }

    res.json(invoices)
  }



}


export default sellerController;