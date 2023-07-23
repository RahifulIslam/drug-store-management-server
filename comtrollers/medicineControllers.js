const _ = require('lodash');
const { Medicine, validate} = require('../models/medicineModel');

module.exports.addMedicine = async(req, res)=> {
    // console.log("Authorized user are:", req.user)
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let medicine = {};
    medicine = new Medicine(_.pick(req.body, ['name', 'type', 'description', 'quantity', 'actual_price', 'selling_price', 'generics', 'company']));

    try{
        const result = await medicine.save();
        return res.status(201).send({
            message: "Medicine added successfully!",
            medicine: _.pick(result, ["_id", "name", "type", "description", "company"])
        })
    } catch( error ){
        return res.status(500).send("Something failed!")
    }
}

module.exports.getMedicine = async(req, res)=> {
    try{
        const medicines = await Medicine.find();
        return res.status(201).send(medicines)
    } catch(error) {
        return res.status(500).send("Somethig failed!")
    }
}