const _ = require('lodash');
const { Sale } = require('../models/saleModel')

module.exports.createSale = async(req, res)=> {
  // console.log("Paid price", req.body)
    try{
        const medicines = req.body.medicines;
        const soldBy = req.user.name;
        const customar = req.body.customar;
        // Calculate the total price
        // let total_price = 0;
        // for (const medicine of medicines) {
        //     total_price += medicine.price;
        //   }

          //Create a new sale document
          const newSale = new Sale({
            medicines: medicines,
            total_price: req.body.total_price,
            paid_price: req.body.paid_price,
            rest_price: req.body.rest_price,
            sold_by: soldBy,
            customar: customar
          })

          await newSale.save();

          res.status(201).json({ message: 'Sale record saved successfully.' });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while saving the sale.', error: error.message });
      }
}