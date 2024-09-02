require('dotenv').config();;

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');
const errorHandler = require('./middlewares/errorHandlerMiddleware');


connectDB();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));

//Routes
app.use('/', userRouter);
app.use('/', categoryRouter);
app.use('/', transactionRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
