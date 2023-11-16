const nodemailer = require('nodemailer');
// Send OTP to the user's email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alhajpharmacy69@gmail.com',
        pass: 'lwxe ecrw eroq tkzq',
    },
});

module.exports = {
    transporter
}