const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const saleSchema = new mongoose.Schema({
    medicines: [
        {
            medicine_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Medicine',
            },
            medicine_name: {
                type: String,
            },

            price_per_item: {
                type: Number,
                required: true,
            },

            quantity: {
                type: Number,
                required: true,
            },
            
            total_price_each_item: {
                type: Number,
                required: true,
            },
        },
    ],

    total_price: {
        type: Number,
        required: true,
    },

    discount: {
        type: Number,
        required: true,
    },

    total_after_discount: {
        type: Number,
        required: true,
    },

    sold_by: {
        type: String,
    },

    // paid_price: {
    //     type: Number,
    //     required: true,
    // },

    // rest_price: {
    //     type: Number
    // },

    // date: {
    //     type: Date,
    //     default: Date.now,
    // },

    // customer: {
    //     name: {
    //         type: String,
    //     },
    //     father_name: {
    //         type: String,
    //     },
    //     address: {
    //         type: String,
    //     },
    //     phone_number: {
    //         type: String,
    //     },

    // },

});

module.exports.Sale = mongoose.model('Sale', saleSchema);