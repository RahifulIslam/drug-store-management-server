const router = require('express').Router();
const { addMedicine, 
    getMedicine, 
    addMedicineQuantity,
    updateMedicine
} = require('../comtrollers/medicineControllers');

const authorize = require('../middlewares/authorize');

router.route('/addmedicine')
            .post(authorize, addMedicine);

router.route('/getallmedicine')
            .get(authorize, getMedicine);

router.route('/updateQuantity/:id')
            .put(authorize, addMedicineQuantity)

router.route('/updateMedicine/:id')
            .put(authorize, updateMedicine)

module.exports = router;
