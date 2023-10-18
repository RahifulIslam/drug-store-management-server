const _ = require("lodash");
const { Sale } = require("../models/saleModel");

module.exports.createSale = async (req, res) => {
  console.log("Paid price", req.body)
  try {
    const medicines = req.body.medicines;
    // console.log("Medicines are:", medicines)
    const soldBy = req.user.name;

    //Create a new sale document
    const newSale = new Sale({
      medicines: medicines,
      total_price: req.body.total_price,
      discount: req.body.discount,
      total_after_discount: req.body.total_after_discount,
      sold_by: soldBy,
    });

    await newSale.save();

    res.status(201).json({ message: "Sale record saved successfully." });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while saving the sale.",
        error: error.message,
      });
  }
};
