import express from "express";
import userController from "../controllers/user.js";
import upload from "../middleware/upload.js";
import middile from '../middleware/require.js';
import authenticate from "../middleware/authenticate.js";




const router = express.Router();
//authentication
router.use('/register', upload.fields([{ name: 'pimage', maxcount: 1 }]));
router.use('/editProfilePic', upload.fields([{ name: 'pimage', maxcount: 1 }]));

//post request
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/addProduct', authenticate, middile.admin, userController.addProduct);
router.post('/addLoaction', authenticate, middile.admin, userController.addLoaction);
router.post('/addCategory', authenticate, middile.admin, userController.addCategory);


//  router.post('/verify', userController.verifyOTP)

//get request
router.get('/costumersInvoice', userController.costumersInvoice);
router.get('/GetdailycostumersInvoice', authenticate, middile.admin, userController.GetdailycostumersInvoice);
router.get('/RecentaddedProduct', authenticate, middile.admin, userController.RecentaddedProduct);
router.get('/dailyaddedMiscellaneous', authenticate, middile.admin, userController.dailyaddedMiscellaneous);
router.get('/Deposite', authenticate, middile.admin, userController.Deposite);
router.get('/getStaff', userController.getStaff);
router.get('/getProductByid/:_id', authenticate, middile.admin, userController.getProductByid);
router.get('/GetMiscellaneous', authenticate, middile.admin, userController.GetMiscellaneous);
router.get('/getexpances', authenticate, middile.admin, userController.getexpances);
router.get('/GetdailyExpances', authenticate, middile.admin, userController.GetdailyExpances);
router.get('/getProductByLoaction/:location', authenticate, middile.admin, userController.getProductByLoaction);
router.get('/getStaffByid/:_id', authenticate, middile.admin, userController.getStaffByid);




// router.get('/getProductByid/:_id', authenticate, middile.admin, userController.getProductByid);

router.get('/getMember', userController.getMember);
router.get('/getMemberByid/:_id', userController.getMemberByid);


//post

router.post('/GetReport', authenticate, middile.admin, userController.GetReport);
router.post('/addNewmember', authenticate, middile.admin, userController.addNewmember);




//patch request
router.patch('/editProfile', authenticate, userController.editProfile);
router.patch('/changeUserPassword', authenticate, middile.admin, userController.changeUserPassword);
router.patch('/editProfilePic', authenticate, userController.editProfilePic);
router.patch('/addInvoceToMemberId/:_id', authenticate, userController.addInvoceToMemberId);


export default router;