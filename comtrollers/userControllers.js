const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/userModel");
const { transporter } = require("../middlewares/emailTransporter");

const signUp = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = {};
  user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered!");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // const token = user.generateJWT();
  try {
    const result = await user.save();
    return res.status(201).send({
      message: "Registration Successful!",
      user: _.pick(result, ["_id", "name", "email"]),
    });
  } catch (error) {
    return res.status(500).send("Something failed!");
  }
};

const signIn = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password!");

  const validUser = await bcrypt.compare(req.body.password, user.password);
  if (!validUser) return res.status(401).send("Invalid email or password!");

  const token = user.generateJWT();
  return res.status(200).send({
    message: "Login successful",
    token: token,
    user: _.pick(user, ["_id", "name", "email"]),
  });
};

// Sending OTP to user email for reset password
const sendOTP = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate and save the reset password OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.resetPasswordOTP = {
      code: otp,
      expiresAt: Date.now() + 60 * 4000,
    };
    await user.save();

    const mailOptions = {
      from: "rahifulislam@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(503)
          .json({ message: "Service Unavailable: Error sending OTP email" });
      }
      res.json({ message: "OTP sent successfully" });
    });
  } catch (error) {
    return res.status(500).send("Something failed!");
  }
};

const verifyOTP = async (req, res) => {
  console.log("hi--1");
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("hi--2");
    // Check if the OTP is valid and not expired
    const currentTimestamp = Date.now();
    if (
      !user.resetPasswordOTP ||
      user.resetPasswordOTP.code !== otp ||
      user.resetPasswordOTP.expiresAt < currentTimestamp
    ) {
      console.log("hi--3");
      return res.status(400).json({ message: "Invalid or expired OTP" });
    } else {
      console.log("hi--4");
      res.json({ message: "OTP verified successfully" });
    }
  } catch (error) {
    return res.status(500).send("Something failed!");
  }
};

module.exports = {
  signUp,
  signIn,
  sendOTP,
  verifyOTP,
};
