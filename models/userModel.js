const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../service.json');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },

    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    resetPasswordOTP: {
        code: {
            type: Number,
        },
        expiresAt: {
            type: Date,
        },
    }

}, { timestamps: true });

//

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id : this._id,
        email: this.email,
        role: this.role,
        name: this.name,
    },JWT_SECRET_KEY, { expiresIn: "9h" });

    return token;

}

//

const validateUser = user => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100),
        email: Joi.string().min(5).max(255),
        password: Joi.string().min(3).max(100),
    });

    return schema.validate(user);
};

module.exports.User = mongoose.model('User', userSchema);
module.exports.validate = validateUser;