// import registration from "../Schema/Registration.js";
import initMB from 'messagebird';
const messagebird = initMB('ZUcVDMrE8WjDTdP0h22BQfXdV');
import Product from "../Schema/Products.js";
import Location from "../Schema/Location.js";
import Registration2 from "../Schema/Registration2.js";
import Invoice from '../Schema/costumersInvoice.js'
import mongoose from 'mongoose';
import Category from "../Schema/Category.js";
import Miscellaneous from '../Schema/Miscellaneous.js';
import Deposite from '../Schema/deposite.js';
import NewUser from "../Schema/NewAccount.js"
import Expances from '../Schema/expances.js';
import StoreInvoice from "../Schema/storeInvoice.js"
import AllProduct from '../Schema/ProductTobe.js';
// import Miscellaneous from '../Schema/Miscellaneous.js';

// process.env.SECRET_KEY
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';



class userController {


  static register = async (req, res) => {

    try {
      const { phonenumber, name, email, role, password, memberId } = req.body;

      // const pimage = req.files['pimage'][0].filename
      const userLogin = await Registration2.findOne({ phonenumber: phonenumber });
      console.log(userLogin)
      if (userLogin) {
        if (userLogin.phonenumber == phonenumber) {
          console.log(userLogin)
          res.status(201).send({ message: "number already register", })
        }
      }
      else {
        const lol = { phonenumber, name, email, role, password, memberId }
        const register = new Registration2(lol)
        await register.save()
        res.status(201).send({ message: "succesfull", status: "success" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }




  static addNewmember = async (req, res) => {

    try {

      console.log(req.body)
      const { phonenumber } = req.body
      const userLogin = await NewUser.findOne({ phonenumber });
      console.log(userLogin)
      if (userLogin) {
        if (userLogin.phonenumber == phonenumber) {
          console.log(userLogin)
          res.status(201).send({ message: "number already register", })
        }
      }
      else {
        // const lol = { phonenumber, name, email, role, pimage, password }
        const register = new NewUser(req.body)
        await register.save()
        res.status(201).send({ message: "success", status: "success" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }
  static getLocation = async (req, res) => {
    const locations = await Location.find({})
    res.send(locations)
  };

  static getMember = async (req, res) => {
    const deposite = await NewUser.find({}).populate("Invioces", ["cash", "credit", "createdAt"])
    res.json(deposite)
  }

  static getMemberByid = async (req, res) => {
    const { _id } = req.params
    const product = await NewUser.findOne({ _id }).populate("Invioces", ["cash", "credit", "createdAt"])
    res.json(product)
  }

  static deleteMemberByid = async (req, res) => {
    const { _id } = req.params
    const product = await NewUser.findByIdAndDelete({ _id })
    res.json(product)
  }
  static deleteProductByid = async (req, res) => {
    const { _id } = req.params
    const product = await Product.findByIdAndDelete({ _id })
    console.log(product)
    res.json({ status: "success" })
  }

  static updateProductByid = async (req, res) => {
    const { _id } = req.params
    const { quantity, name } = req.body

    const product = await Product.findByIdAndUpdate({ _id }, { name: name })
    console.log(product)
    res.json({ status: 'success' })
  }

  static updateProductByLocation = async (req, res) => {
    const { _id } = req.params
    const { quantity, name } = req.body

    const product = await Product.findByIdAndUpdate({ _id }, { name: name })
    console.log(product)
    res.json({ status: 'success' })
  }


  static updateMemberByid = async (req, res) => {
    const { _id } = req.params

    const product = await NewUser.findByIdAndUpdate({ _id }, { role: "supplier" })
    res.json(product, { status: 'success' })
  }



  static addInvoceToMemberId = async (req, res) => {
    try {
      const { Invioces } = req.body
      console.log(Invioces)

      const { _id } = req.params
      console.log(_id, "_id")

      for (let index = 0; index < Invioces.length; index++) {
        const element1 = Invioces[index];

        const userNewProduct = await Invoice.findOneAndUpdate({ _id: element1 }, { $set: { assigned: "Yes" } })
        console.log(userNewProduct, "85")
      }


      // const memberwithinvoces = await NewUser.findByIdAndUpdate(_id, {
      //   $push: { Invioces:Invioces},
      // }).populate('Invioces')

      // res.send({ status: 'success', message: 'Invoices saved', memberwithinvoces })

      const memberwithinvoces = await NewUser.updateOne({ _id: _id },
        //    {$push: {Invioces:Invioces},
        // }).populate('Invioces')
        { $push: { Invioces: { $each: [...Invioces] } } }).populate("Invioces")

      console.log(memberwithinvoces)
      res.send({ status: 'success', message: 'Invoices saved', memberwithinvoces })

    } catch (error) {
      console.log(error)
      return res.status(422).json({ error: 'not found data' })
    }
  }

  static GetCostumerInvoiceBySearch = async (req, res) => {
    const keyword = req.query.search
      ? {
        $or: [
          { deliveryStatus: { $eq: req.query.search } },
          { assigned: { $eq: req.query.search } },

          { billNumber: { $regex: req.query.search, $options: "i" } },

          // { deliveryStatus: { $regex: req.query.search, $options: "i" } },
        ],
      }
      : {};

    const users = await Invoice.find(keyword);
    res.send(users);
  };
  static getProductByName = async (req, res) => {
    const { name } = req.params
    console.log(name)
    const product = await Product.find({ name })
    res.json(product)
  }


  static getMemberInvocesById = async (req, res) => {
    const { _id } = req.params
    console.log(_id)
    const deposite = await NewUser.findOne({ _id }).populate('Invioces')
    res.json(deposite)
  }



  static RecentaddedProduct = async (req, res) => {

    try {
      const ram = await Product.find({
        "createdAt": { $lt: new Date(), $gt: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) }
      })
      if (ram) {
        res.send(ram)
      }
    }
    catch (error) {
      console.log(error, { message: "items not added" })
    }
  }


  static DailyDeliveryStatus = async (req, res) => {

    try {


      const ram = AllProduct.aggregate([

        {
          $match: { "createdAt": { $lt: new Date(), $gt: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) } }
        },
        // Stage 2: Group remaining documents by pizza name and calculate total quantity
        {
          $group: { _id: "$name", totalToBeDelivered: { $sum: "$ToBeDelivered" } }
        }
      ])

      if (ram) {
        res.send(ram)
      }
    }
    catch (error) {
      console.log(error, { message: "items not added" })
    }
  }



  static dailyaddedMiscellaneous = async (req, res) => {

    try {

      const ram = await Miscellaneous.find({

        "createdAt": { $lt: new Date(), $gt: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) }
      })

      if (ram) {
        res.send(ram)
      }

    }
    catch (error) {
      console.log(error, { message: "items not added" })
    }

  }


  static GetdailycostumersInvoice = async (req, res) => {

    try {
      const ram = await Invoice.find({
        "createdAt": { $lt: new Date(), $gt: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) }
      })
      if (ram) {
        res.send(ram)
      }
    }
    catch (error) {
      console.log(error, { message: "items not added" })
    }
  }





  static GetdailyMiscellaneous = async (req, res) => {

    try {

      const ram = await Invoice.find({
        // to get last 24 hour sells record
        "createdAt": { $lt: new Date(), $gt: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) }
      })

      if (ram) {
        //  console.log(ram) 
        //  console.log(new Date(new Date().getTime()-(24*60*1000)))
        //  console.log(new Date(new Date().getTime()-(24*60*60*1000)))

        res.send(ram)
      }
    }
    catch (error) {
      console.log(error, { message: "items not added" })
    }

  }

  static GetdailyExpances = async (req, res) => {

    try {

      const ram = await Expances.find({
        // to get last 24 hour sells record
        "createdAt": { $lt: new Date(), $gt: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) }
      })

      if (ram) {
        //  console.log(ram) 
        //  console.log(new Date(new Date().getTime()-(24*60*1000)))
        //  console.log(new Date(new Date().getTime()-(24*60*60*1000)))

        res.send(ram)
      }
    }
    catch (error) {
      console.log(error, { message: "items not added" })
    }

  }

  static GetReport = async (req, res) => {

    try {
      const { startdate, enddate } = req.body

      const ram = await Invoice.find({
        "createdAt": { $gte: startdate, $lt: enddate }
      })
      if (ram) {
        res.send(ram)
      }
    }
    catch (error) {
      console.log(error, { message: "items not added" })
    }
  }

  // static addProduct = async (req, res) => {
  //   const product = new Product(req.body)
  //   try {
  //     await product.save()
  //     res.status(201).send(product)
  //   } catch (e) {
  //     res.status(400).send(e)
  //   }
  // };


  // static addProduct = async (req, res) => {
  //   const { name, quantity, location } = req.body
  //   try {
  //     const preAllProduct = await AllProduct.findOne({ name })
  //     console.log(preAllProduct, "preAllProduct")
  //     // res.send(preAllProduct)
  //     // const preProduct = await Product.findOne({ name })

  //     const raju = await Product.find({ $and: [{ name }, { location }] })

  //     if (preAllProduct === null && raju.length === 0) {
  //       const allProduct = new AllProduct(req.body)
  //       await allProduct.save()
  //       const product = new Product(req.body)
  //       await product.save()
  //       console.log(allProduct, "330")

  //       res.send({ status: "success" })

  //     }

  //     console.log(raju, "308")

  //     const preProduct = raju[0]
  //     if (raju.length === 0 && preAllProduct !== null) {
  //       // const allProduct = new AllProduct(req.body)
  //       // await allProduct.save()
  //       // if (allProduct) {
  //       const product = new Product(req.body)
  //       await product.save()
  //       console.log(product, "pro")
  //       // res.status(201).send(product)
  //       // }
  //       if (product) {

  //         const newQuantity = preAllProduct.quantity + quantity

  //         const updateAllProduct = await AllProduct.findOneAndUpdate({ name }, { $set: { quantity: newQuantity } })
  //         // res.status(201).send(updateAllProduct)
  //         res.send({ status: "success" })

  //         console.log(updateAllProduct, "320")

  //       }
  //     }
  //     else {
  //       const newQuantity = preProduct.quantity + quantity
  //       const newAllQuantity = preAllProduct.quantity + quantity
  //       const updateAllProduct = await AllProduct.findOneAndUpdate({ name }, { $set: { quantity: newAllQuantity } })
  //       // if (preProduct.location == location) {
  //       const { _id } = preProduct
  //       const updateProduct = await Product.findOneAndUpdate({ _id }, { $set: { quantity: newQuantity } })
  //       console.log(updateProduct, "340")
  //       res.status(201).send(updateProduct)
  //       // }
  //     }
  //     //  const  allProduct = new AllProduct({name,quantity})
  //   } catch (e) {
  //     res.status(400).send(e)
  //   }
  // };


  static addCategory = async (req, res) => {
    const category = new Category(req.body)
    try {
      await category.save()
      res.status(201).send(category, { status: "success" })
    } catch (e) {
      res.status(400).send(e)
    }
    console.log(req.body)
    // res.send(req.body)
  }


  static addLoaction = async (req, res) => {
    const location = new Location(req.body)
    try {
      await location.save()
      res.status(201).send(location, { status: "success" })
    } catch (e) {
      res.status(400).send(e)
    }
    console.log(req.body)
  }


  static getProductByid = async (req, res) => {
    const { _id } = req.params
    const product = await Product.find({ _id })
    res.json(product)
  }

  static getStaffByid = async (req, res) => {
    const { _id } = req.params
    const product = await Registration2.find({ _id })
    res.json(product)
  }



  static getProductByLoaction = async (req, res) => {
    const { location } = req.params
    const product = await Product.find({ location })
    res.json(product)
  }

  static costumersInvoice = async (req, res) => {
    const invoice = await Invoice.find({})
    res.json(invoice)
  }

  static GetcostumersInvoiceById = async (req, res) => {
    const { _id } = req.params
    console.log(_id)
    const invoice = await Invoice.findOne({ _id })
    console.log(invoice)
    res.json(invoice)
  }


  static getStoreInvoice = async (req, res) => {
    const invoice = await StoreInvoice.find({ status: "Active" })
    res.json(invoice)
  }
  static getStoreInvoiceById = async (req, res) => {
    const { _id } = req.params

    const invoice = await StoreInvoice.findOne({ _id })
    res.json(invoice)
  }


  static getexpances = async (req, res) => {
    const invoice = await Expances.find({})
    res.json(invoice)
  }
  static getexpancesById = async (req, res) => {
    const { _id } = req.params

    const invoice = await Expances.findOne({ _id })
    res.json(invoice)
  }

  static GetMiscellaneous = async (req, res) => {
    const invoice = await Miscellaneous.find({})
    res.json(invoice)
  }
  static GetMiscellaneousById = async (req, res) => {
    const { _id } = req.params

    const invoice = await Miscellaneous.findOne({ _id })
    res.json(invoice)
  }

  static Deposite = async (req, res) => {
    const deposite = await Deposite.find({ status: "Active" })
    res.json(deposite)
  }
  static GetDepositeById = async (req, res) => {
    const { _id } = req.params

    const deposite = await Deposite.findOne({ _id })
    res.json(deposite)
  }

  static updateAddDeposite = async (req, res) => {
    // res.json(req.body)
    const { billNumber, DepositebillNumber, cash } = req.body

    try {

      console.log(req.body)

      //   console.log(userProduct.credit)
      // const userProduct = Invoice.findOne({ billNumber: billNumber })
      // let NewCredit = userProduct.credit >= cash ? userProduct.credit - cash : 0
      // const userNewProduct = await Invoice.findOneAndUpdate({ billNumber: billNumber }, { $set: { credit: NewCredit } })
      const userNewProduct = await Invoice.updateOne({ billNumber: billNumber }, { $inc: { credit: -Number(cash) } })
      console.log(userNewProduct, 'deposite succesfull');
      if (userNewProduct) {
        const ram = await Deposite.findOneAndUpdate({ billNumber: billNumber }, { $set: { status: "Active", billNumber, DepositebillNumber, cash } })
        res.send({ status: "success", message: "bill updated" })
      }

    } catch (err) {
      res.status(400).send(err)
    }
    // console.log(deposite)

  };



  static getStaff = async (req, res) => {
    try {
      const Staff = await Registration2.find()
      const staff = Staff.filter((element) => {
        return (element.role = 'staff')
      })
      res.send(staff)
    } catch (error) {
      console.log(error)
    }
  }


  static changeUserPassword = async (req, res) => {

    try {
      // const { password, password_confirmation,Oldpassword } = req.body
      const { password, password_confirmation, _id } = req.body

      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        }
        const userLogin = await Registration2.findOne({ _id })
        console.log(userLogin)
        if (userLogin) {

          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          await Registration2.findByIdAndUpdate(_id, { $set: { password: newHashPassword } })
          res.send({ "status": "success", "message": "Password changed succesfully" })
        }
        // }

        else {
          res.send({ "status": "failed", "message": "All Fields are Required" })
        }
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }


  // static changeUserPasswordByid = async (req, res) => {

  //   try {
  //     // const { password, password_confirmation,Oldpassword } = req.body
  //     const { password, password_confirmation, id } = req.body

  //     if (password && password_confirmation) {
  //       if (password !== password_confirmation) {
  //         res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
  //       }
  //       const userLogin = await Registration2.findByIdAndUpdate({ _id: id })
  //       console.log(userLogin)
  //       if (userLogin) {

  //         const salt = await bcrypt.genSalt(10)
  //         const newHashPassword = await bcrypt.hash(password, salt)
  //         await Registration2.findByIdAndUpdate(id, { $set: { password: newHashPassword } })
  //         res.send({ "status": "success", "message": "Password changed succesfully" })
  //       }
  //       // }

  //       else {
  //         res.send({ "status": "failed", "message": "All Fields are Required" })
  //       }
  //     }
  //   }
  //   catch (error) {
  //     console.log(error)
  //     return res.status(422).json({ error: "not found data" })
  //   }
  // }




  static editProfile = async (req, res) => {

    try {
      const { email, name, phonenumber } = req.body
      console.log(req.body, "272")
      const userLogin = await Registration2.findOne({ _id: req.user._id })

      if (userLogin) {
        await Registration2.findByIdAndUpdate(req.user._id, { $set: { name: name, phonenumber: phonenumber, email: email } })
        res.send({ "status": "success", "message": "Profile changed succesfully" })
      }
      else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }



  static addProduct = async (req, res) => {
    const { name, quantity, location } = req.body
    try {
      const preAllProduct = await AllProduct.findOne({ name })
      console.log(preAllProduct, "preAllProduct")
      // res.send(preAllProduct)
      // const preProduct = await Product.findOne({ name })

      const raju = await Product.find({ $and: [{ name }, { location }] })

      if (preAllProduct === null && raju.length === 0) {
        const allProduct = new AllProduct(req.body)
        await allProduct.save()
        const product = new Product(req.body)
        await product.save()
        console.log(allProduct, "330")

        res.send({ status: "success" })

      }

      console.log(raju, "308")

      const preProduct = raju[0]
      if (raju.length === 0 && preAllProduct !== null) {
        // const allProduct = new AllProduct(req.body)
        // await allProduct.save()
        // if (allProduct) {
        const product = new Product(req.body)
        await product.save()
        console.log(product, "pro")
        // res.status(201).send(product)
        // }
        if (product) {

          const newQuantity = preAllProduct.quantity + quantity

          const updateAllProduct = await AllProduct.findOneAndUpdate({ name }, { $set: { quantity: newQuantity } })
          // res.status(201).send(updateAllProduct)
          res.send({ status: "success" })

          console.log(updateAllProduct, "320")

        }
      }
      else {
        const newQuantity = preProduct.quantity + quantity
        const newAllQuantity = preAllProduct.quantity + quantity
        const updateAllProduct = await AllProduct.findOneAndUpdate({ name }, { $set: { quantity: newAllQuantity } })
        // if (preProduct.location == location) {
        const { _id } = preProduct
        const updateProduct = await Product.findOneAndUpdate({ _id }, { $set: { quantity: newQuantity } })
        console.log(updateProduct, "340")
        res.status(201).send(updateProduct)
        // }
      }
      //  const  allProduct = new AllProduct({name,quantity})
    } catch (e) {
      res.status(400).send(e)
    }
  };



  static UpdateStorePurchage = async (req, res) => {

    try {
      const { products, location, billNumber, supplierName, totalAmount } = req.body

      const productLocation = await Product.find({ location })



      for (let index = 0; index < products.length; index++) {
        const element1 = products[index].selectProduct;
        const element2 = products[index].quantity;

        const userProduct = await AllProduct.findOne({ name: element1 })
        let olQuantity = userProduct.quantity
        let oldRemainingquantity = userProduct.Remainingquantity

        let newQuantity = olQuantity + element2
        let newRemainingquantity = oldRemainingquantity ? oldRemainingquantity + element2 : userProduct.quantity + element2

        const userNewProduct = await AllProduct.findOneAndUpdate({ name: element1 }, { $set: { Remainingquantity: newRemainingquantity, quantity: newQuantity } })
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

      for (let index = 0; index < sita().length; index++) {
        const element = sita()[index]._id;
        const newQuantity = sita()[index].quantity;

        await Product.findByIdAndUpdate(element, { $set: { quantity: newQuantity } })


      }



      const run = await StoreInvoice.findOneAndUpdate({ billNumber }, { $set: { status: "Active", products, totalAmount, supplierName } })

      if (run) {
        res.send({ "status": "success", "message": "location vice products  updated succesfully" })
        console.log(run)
      }

    }

    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }





  static editProfileById = async (req, res) => {

    try {
      const { _id } = req.params
      const { email, name, phonenumber } = req.body
      console.log(req.body, "272")
      // const userLogin = await Registration2.findOne({ _id: req.user._id })

      if (req.body) {
        await Registration2.findByIdAndUpdate(_id, { $set: { name: name, phonenumber: phonenumber, email: email } })
        res.send({ "status": "success", "message": "Profile changed succesfully" })
      }
      else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }


  static editProfilePic = async (req, res) => {

    try {

      const pimage = req.files['pimage'][0].filename
      const userLogin = await Registration2.findOne({ _id: req.user._id })

      if (userLogin) {
        await Registration2.findByIdAndUpdate(req.user._id, { $set: { pimage: pimage } })
        res.send({ "status": "success", "message": "ProfilePic changed succesfully" })
      }
      else {
        res.send({ "status": "failed", "message": " select pic" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }






  static login = async (req, res) => {

    try {
      const { phonenumber, password } = req.body

      if (!phonenumber || !password) {
        return res.status(400).json({ error: "pls filled data" })
      }

      const userLogin = await Registration2.findOne({ phonenumber: phonenumber });
      if (userLogin) {

        const isMatch = await bcrypt.compare(password, userLogin.password)

        // const token = await userLogin.generateAuthToken();
        const token = jwt.sign({ userID: userLogin._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        // console.log(token); 
        // res.cookie("jwtoken", token,{
        //     expires:new Date(Date.now() + 2589000000),
        //    httpOnly:true});

        !isMatch ? res.status(400).send({ message: "error" }) : res.send({ "status": "success", "message": "Login Success", "token": token, })

      }
      else { res.status(400).send({ message: "filled invalid data" }) }

    } catch (error) {
      console.log(error);
    }
  };


  // static verifyOTP = async (req, res) => {
  //   const { id, otpcode } = req.body
  //   messagebird.verify.verify(id, otpcode,
  //     (err, response) => {
  //       if (err) {
  //         // Incorrect OTP
  //         console.log("OTP Verification Error:", err)
  //         res.status(200).send({ "status": "failed", "message": "Invalid OTP" })
  //       } else {
  //         // Login Success
  //         console.log("OTP Verification Response:", response)
  //         res.status(200).send({ "status": "success", "message": "Login Success" })
  //       }
  //     });
  // }


}

export default userController;