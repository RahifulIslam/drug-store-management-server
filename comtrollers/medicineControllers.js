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
        return res.status(500).send("Something failed!")
    }
}

module.exports.addMedicineQuantity = async(req, res)=> {
    try {
        const medicineId = req.params.id;
        console.log("Medicine Id is:", medicineId)
        const { add_quantities } = req.body;
        console.log("Quantities are:", add_quantities)

        const medicine = await Medicine.findById(medicineId);
        if(!medicine) return res.status(404).send({message: "Medicine not found"})

        medicine.quantity += add_quantities;
        await medicine.save();
        return res.send({ message: 'Quantity updated successfully', medicine });

    } catch(error){
        console.error(error);
        return res.status(500).send({message: "Internal server error"})
    }
}

module.exports.updateMedicine = async (req, res) => {
    try{
        const medicineId = req.params.id;
        const updateMedicineData = req.body;

        const medicine = await Medicine.findById(medicineId);
        if(!medicine) return res.status(404).send({message: "Medicine not found"});

        // Update all information of the medicine with the new data
        Object.assign(medicine, updateMedicineData);

        // Save the updated medicine
        await medicine.save();

        return res.json({ message: 'Medicine information updated successfully', medicine });
    } catch(error) {
        console.error(error);
        return res.status(500).send({message:"Internal Server error"})
    }

}

module.exports.getMedicineNameAndCategory = async(req, res)=>{
    try{
        const medicineNameAndType = await Medicine.find({}, 'name type actual_price selling_price');
        res.json(medicineNameAndType)
    } catch(error){
        return res.status(500).json({message: 'Server error', error: error.message})
    }
}

