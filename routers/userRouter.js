const router = require('express').Router();

const { 
    signUp, 
    signIn, 
    sendOTP,
    verifyOTP,
            } = require('../comtrollers/userControllers');

router.route('/signup')
            .post(signUp);
router.route('/signin')            
            .post(signIn);
router.route('/send-otp')            
            .post(sendOTP);
router.route('/verify-otp')            
            .post(verifyOTP);


module.exports = router;