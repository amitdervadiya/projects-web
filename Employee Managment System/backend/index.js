const express = require('express');
const port = 2005;
const app = express();
const db = require('./config/db');
const adminRoute = require('./route/adminRoute');
const managerRoute = require('./route/managerRoute');
const employeeRoute = require('./route/employeeRoute');
const path = require('path')
const cors = require('cors')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')))

app.use("/", adminRoute);
app.use("/manager", managerRoute);
app.use("/employee", employeeRoute);
app.listen(port, (err) => {
    err ? console.log(err) : console.log(`server started : http://localhost:${port}`)
})