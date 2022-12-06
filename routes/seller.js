import express from 'express';
import sellerController from '../controllers/seller.js';
import upload from '../middleware/upload.js';
import authenticate from "../middleware/authenticate.js";
import middile from '../middleware/require.js';

const router = express.Router()
//authentication
// router.use(
//   '/storeInvoice',
//   upload.fields([{ name: 'addAttachment', maxcount: 1 }])
// )
// router.use(
//   '/Miscellaneous',
//   upload.fields([{ name: 'addAttachment', maxcount: 1 }])
// )
//post request
// router.post('/costumersInvoice' ,authenticate,middile.seller, sellerController.costumersInvoice)





//get request

router.get('/getAllInvioces', sellerController.getAllInvioces);



export default router
