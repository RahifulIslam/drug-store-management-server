const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../service.json');
// console.log("enter authorize 1")
module.exports = async (req, res, next) => {
    // console.log("enter authorize 2")

    let token = req.header('Authorization');
    // console.log("token are:", token)
    if (!token) return res.status(401).send('Access denied! No token provided');
    //Bearer 1234abcd
    //[0]=Bearer, [1]= 1234abcd
    else token = token.split(" ")[1].trim();

    const decoded = await jwt.verify(token, JWT_SECRET_KEY);

    // console.log("decoded data are: ", decoded)

    // Decoded => undefind
    if (!decoded) return res.status(400).send('Invalid token');

    //We can uses decoded data any places using req.user
    req.user = decoded;
    // console.log("req user contains:",  req.user)


    next();
}