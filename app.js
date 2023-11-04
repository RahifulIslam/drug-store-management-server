const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const userRouter = require('./routers/userRouter')
const medicineRouter = require('./routers/medicineRouter');
const saleRouter = require('./routers/saleRouter');


const app = express();

app.use(compression());
app.use(morgan());
app.use(helmet());
app.use(cors());
app.use(express.json());


app.use('/api/user', userRouter);
app.use('/api/medicine', medicineRouter);
app.use('/api/sale', saleRouter);
module.exports = app;