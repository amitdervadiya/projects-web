const employeeSchema = require('../model/employeeSchema');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOtp } = require('../middleware/mailer');

module.exports.employeeList = async (req, res) => {
    await employeeSchema.find({}).then((data) => {
        res.status(200).json({ message: "All employee Data", data });
    });
}

module.exports.employeeRegister = async (req, res) => {
    console.log(req.body);

    req.body.image = req.file?.path || null;
    req.body.employeePassword = await bcryptjs.hash(req.body.employeePassword, 10);

    if (!req.body.managerId) {
        return res.status(400).json({ message: "Manager ID is required!" });
    }

    await employeeSchema.create(req.body)
        .then((data) => employeeSchema.findById(data._id).populate("managerId"))
        .then((populatedData) =>
            res.status(200).json({ message: "Employee Created Successfully", data: populatedData })
        )
        .catch((error) =>
            res.status(500).json({ message: "Server Error", error })
        );
};



module.exports.employeeLogin = async (req, res) => {
    let employee = await employeeSchema.findOne({ employeeEmail: req.body.employeeEmail });

    if (!employee) {
        return res.status(200).json({ message: "employee Not Found" });
    }
    if (await bcryptjs.compare(req.body.employeePassword, employee.employeePassword)) {
        let token = jwt.sign({ employeeData: employee }, "employee000", { expiresIn: "3h" });
        res.status(200).json({ message: "employee Log In", token: token });
        console.log(token)
        console.log("login succesfully ")
    } else {
        res.status(200).json({ message: "Password is wrong" });
    }
}

module.exports.deleteemployee = async (req, res) => {
    await employeeSchema.findByIdAndDelete(req.query.id).then((data) => {
        if (fs.existsSync(data.image)) {
            fs.unlinkSync(data.image);
        }
        res.status(200).json({ message: "This employee is Deleted", data });
    });
}

module.exports.updateemployee = async (req, res) => {
    if (req.user.employeeData._id !== req.query.id) {
        return res.status(403).json({ message: "Access denied. You can only update your own profile." });
    }
    req.body.employeePassword = await bcryptjs.hash(req.body.Password, 10);
    const data = await employeeSchema.findByIdAndUpdate(req.query.id, req.body);
    if (!data) {
        return res.status(404).json({ message: "Employee not found" });
    }
    if (fs.existsSync(data.image)) {
        fs.unlinkSync(data.image);
    }
    res.status(200).json({ message: "Employee is Updated", data });
}

module.exports.employeeProfile = async (req, res) => {
    let profile = await employeeSchema.findById(req.user.employeeData._id);
    if (!profile) {
        return res.status(404).json({ message: "employee Not Found" });
    }
    res.status(200).json({ message: "employee Profile", data: profile });
}

module.exports.employeeChangePassword = async (req, res) => {
    let employee = await employeeSchema.findById(req.user.employeeData._id);
    if (!employee) {
        return res.status(404).json({ message: "employee Not Found" });
    }

    const compare = await bcryptjs.compare(req.body.oldPassword, employee.Password);
    if (!compare) {
        return res.status(400).json({ message: "Old Password is incorrect" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({ message: "New Password and Confirm Password do not match" });
    }

    employee.employeePassword = await bcryptjs.hash(req.body.newPassword, 10);
    await employee.save();
    res.status(200).json({ message: "Password changed successfully" });
}

module.exports.forgotPassword = async (req, res) => {
    let employee = await employeeSchema.findOne({ employeeEmail: req.body.Email });
    if (!employee) {
        return res.status(404).json({ message: "employee Not Found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    employee.resetOtp = otp;
    await employee.save();

    sendOtp(employee.Email, otp);
    res.status(200).json({ message: "OTP sent to email" });
}

module.exports.resetPassword = async (req, res) => {
    let employee = await employeeSchema.findOne({ employeeEmail: req.body.Email, resetOtp: req.body.otp });
    if (!employee) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({ message: "New Password and Confirm Password do not match" });
    }

    employee.employeePassword = await bcryptjs.hash(req.body.newPassword, 10);
    await employee.save();

    res.status(200).json({ message: "Password reset successfully" });
}
