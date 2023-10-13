require('./config/config');
require('dotenv').config();

// const CronJob = require('cron').CronJob;
const express = require('express')
const bodyParser = require('body-parser');
const user_router = require('./routes/user')
const morgan = require('morgan')
const cors = require('cors')
const app = express();


app.use(cors({
    origin: "*"
}));

//Middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// admin routes
app.use('/api', user_router)
// routes Error Handle
app.use((req, res, next) => {
    const error = new Error(req.t('Invalid_Rout'))
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            messege: error.message
        }
    });
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const PORT = process.env.MY_PORT;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`)
});