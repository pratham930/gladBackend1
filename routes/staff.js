import express from 'express';
import staffController from '../controllers/staff.js';
import upload from '../middleware/upload.js';
import authenticate from "../middleware/authenticate.js";
import middile from '../middleware/require.js';

const router = express.Router()
//authentication


router.use(
  '/addDeposite',
  upload.fields([{ name: 'addAttachment', maxcount: 1 }])
)

router.use(
  '/addExpances',
  upload.fields([{ name: 'addAttachment', maxcount: 1 }])
)
router.use(
  '/addmiscellaneous',
  upload.fields([{ name: 'addAttachment', maxcount: 1 }])
)

router.use(
  '/storeInvoice',
  upload.fields([{ name: 'addAttachment', maxcount: 1 }])
)
router.use(
  '/Miscellaneous',
  upload.fields([{ name: 'addAttachment', maxcount: 1 }])
)
//post request
router.post('/costumersInvoice', authenticate, middile.staff, staffController.costumersInvoice)
router.post('/storeInvoice', authenticate, middile.staff, staffController.storeInvoice)
router.post('/addExpances', authenticate, middile.staff, staffController.addExpances)

router.post('/addmiscellaneous', authenticate, middile.staff, staffController.addmiscellaneous)
router.post('/addDeposite', authenticate, middile.staff, staffController.addDeposite)



// router.post('/login', UserController.userLogin)
//  router.post('/verify', userController.verifyOTP)

//get request
router.get('/getPofile', authenticate, staffController.getPofile);
router.get('/getProduct', staffController.getProduct);
router.get('/getLocation', staffController.getLocation);
router.get('/getcategory', staffController.getcategory);


export default router;
