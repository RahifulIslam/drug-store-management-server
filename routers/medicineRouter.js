const router = require('express').Router();
const { addMedicine, getMedicine } = require('../comtrollers/medicineControllers');
const authorize = require('../middlewares/authorize');

router.route('/addmedicine')
            .post(authorize, addMedicine);

router.route('/getallmedicine')
            .get(authorize, getMedicine);

module.exports = router;
