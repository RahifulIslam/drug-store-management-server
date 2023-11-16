const router = require('express').Router();

const { 
    signUp, 
    signIn, 
    sendOTP 
            } = require('../comtrollers/userControllers');

router.route('/signup')
            .post(signUp);
router.route('/signin')            
            .post(signIn);
router.route('/reset-password')            
            .post(sendOTP);


module.exports = router;