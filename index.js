require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const cros = require('cros');
const rateLimit = require('express-rate-limit')
const helmet  = require('helmet')
const xssClean = require('xss-clean');
const csurf = require('csurf');
const cookieParser = require('cookie-parser')
const app = express();
app.disable('x-powered-by');
//const mongoSanitize = require('express-mongo-sanitize');
const limiter = rateLimit({
    windowMs : 15 * 60 * 1000, // 15 min time interval
    max : 100, // limit each IP to 100 request per window
    message : 'Too many request from this IP, please try again later'
})
app.use(express.json());
app.use(helmet())
app.use(cros({
    origin : 'http://localhost:3000',
    methods : ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(limiter)
//app.use(mongoSanitize())
app.use(cookieParser())
app.use(csurf({cookie : true}))
app.use(xssClean())
app.use('/upload', express.static('uploads'))
app.use('/api', require('./routes/taskRoutes'))

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log("MongoDB is connected"))
    .catch(err => console.error("Could not connect mongoDb", err));



app.listen(3000, () => console.log("Server is started at port 3000"))