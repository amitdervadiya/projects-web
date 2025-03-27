const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://amitdervadiya:cocmaster1@node.c4vd0.mongodb.net/project');
const db = mongoose.connection;

db.once("open", (err) => {
    err ? console.log(err) : console.log("Connected to MongoDB");
})

module.exports = db;