const router = require('express').Router();
const { createSale } = require('../comtrollers/saleControllers');
const authorize = require('../middlewares/authorize');

router.route('/createSale')
            .post(authorize, createSale);

module.exports = router;