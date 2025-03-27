const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    employeeEmail: {
        type: String,
        required: true
    },
    employeePhone: {
        type: Number,
        required: true
    },
    employeePassword: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'manager',
        required: true
    }
});

const employeeSchema = mongoose.model('employee', schema);

module.exports = employeeSchema;