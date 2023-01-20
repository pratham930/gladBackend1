import express from "express";
import userController from "../controllers/user.js";
import upload from "../middleware/upload.js";
import middile from '../middleware/require.js';
import authenticate from "../middleware/authenticate.js";




const router = express.Router();
//authentication
router.use('/register', upload.fields([{ name: 'pimage', maxcount: 1 }]));
router.use('/editProfilePic', upload.fields([{ name: 'pimage', maxcount: 1 }]));
// router.use(
//     '/updateAddDeposite',
//     upload.fields([{ name: 'addAttachment', maxcount: 1 }])
// )

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
router.get('/getStoreInvoice', authenticate, middile.admin, userController.getStoreInvoice);




// router.get('/getProductByid/:_id', authenticate, middile.admin, userController.getProductByid);

router.get('/getMember', userController.getMember);
router.get('/getMemberByid/:_id', userController.getMemberByid);
router.get('/getMemberInvocesById/:_id', userController.getMemberInvocesById);



router.get('/GetDepositeById/:_id', authenticate, middile.admin, userController.GetDepositeById);
router.get('/GetMiscellaneousById/:_id', authenticate, middile.admin, userController.GetMiscellaneousById);
router.get('/getexpancesById/:_id', authenticate, middile.admin, userController.getexpancesById);
router.get('/getStoreInvoiceById/:_id', authenticate, middile.admin, userController.getStoreInvoiceById);
router.get('/GetcostumersInvoiceById/:_id', authenticate, middile.admin, userController.GetcostumersInvoiceById);








//post

router.post('/GetReport', authenticate, middile.admin, userController.GetReport);
router.post('/addNewmember', authenticate, middile.admin, userController.addNewmember);




//patch request
router.patch('/editProfile', authenticate, userController.editProfile);
router.patch('/changeUserPassword', authenticate, middile.admin, userController.changeUserPassword);
// router.patch('/changeUserPassword', authenticate, middile.admin, userController.changeUserPassword);

router.patch('/editProfilePic', authenticate, userController.editProfilePic);
router.patch('/editProfileById/:_id', authenticate, userController.editProfileById);

router.patch('/addInvoceToMemberId/:_id', authenticate, userController.addInvoceToMemberId);
router.patch('/updateMemberByid/:_id', userController.updateMemberByid);

router.patch('/updateProductByid/:_id', userController.updateProductByid);
router.patch('/updateAddDeposite', authenticate, userController.updateAddDeposite);
router.patch('/UpdateStorePurchage', authenticate, userController.UpdateStorePurchage);


//delete request

router.delete('/deleteMemberByid/:_id', authenticate, userController.deleteMemberByid);
router.delete('/deleteProductByid/:_id', authenticate, userController.deleteProductByid);


export default router;