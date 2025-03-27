const managerSchema = require('../model/managerSchema');
const employeeSchema = require('../model/employeeSchema');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOtp } = require('../middleware/mailer');
const fs = require('fs');



module.exports.managerRegister = async (req, res) => {
    console.log(req.body);

    req.body.image = req.file?.path || null;
    req.body.Password = await bcryptjs.hash(req.body.Password, 10);

    if (!req.body.adminId) {
        return res.status(400).json({ message: "Admin ID is required!" });
    }
    await managerSchema.create(req.body).then((data) =>
        managerSchema.findById(data._id).populate('adminId')
    ).then((data) =>
        res.status(200).json({ message: "Manager Created Successfully", data: data })
    ).catch((error) =>
        res.status(500).json({ message: "Server Error", error })
    );
};


module.exports.managerLogin = async (req, res) => {
    try {
        console.log("Request Body:", req.body);



        let manager = await managerSchema.findOne({ Email: req.body.Email });

        console.log("Found Manager:", manager);
        if (!manager) {
            return res.status(404).json({ message: "Manager Not Found" });
        }

        if (!manager.Password) {
            return res.status(500).json({ message: "Password field is missing in DB" });
        }

        const isMatch = await bcryptjs.compare(req.body.Password, manager.Password);
        if (isMatch) {
            let token = jwt.sign({ managerData: manager }, "employee000", { expiresIn: "3h" });
            return res.status(200).json({ message: "Manager Log In", token });
        } else {
            return res.status(401).json({ message: "Password is wrong" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports.deleteManager = async (req, res) => {
    await managerSchema.findByIdAndDelete(req.query.id).then((data) => {
        if (fs.existsSync(data.image)) {
            fs.unlinkSync(data.image);
        }
        res.status(200).json({ message: "This Manager is Deleted", data });
    });
}

module.exports.updateManager = async (req, res) => {
    if (req.user.managerData._id !== req.query.id) {
        return res.status(403).json({ message: "Access denied. You can only update your own profile." });
    }
    req.body.managerPassword = await bcryptjs.hash(req.body.Password, 10);
    const data = await managerSchema.findByIdAndUpdate(req.query.id, req.body);
    if (!data) {
        return res.status(404).json({ message: "Manager not found" });
    }
    if (fs.existsSync(data.image)) {
        fs.unlinkSync(data.image);
    }
    res.status(200).json({ message: "Manager is Updated", data });
}

module.exports.managerProfile = async (req, res) => {
    console.log("Request User Data:", req.user);

    if (!req.user || !req.user.managerData) {
        return res.status(401).json({ message: "Unauthorized: Invalid Token" });
    }

    try {
        let profile = await managerSchema.findById(req.user.managerData._id);
        if (!profile) {
            return res.status(404).json({ message: "Manager profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error("Error fetching manager profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.employeeList = async (req, res) => {
    await employeeSchema.find({}).then((data) => {
        res.status(200).json({ message: "All Manager Data", data });
    });
}

module.exports.managerChangePassword = async (req, res) => {
    let manager = await managerSchema.findById(req.user.managerData._id);
    if (!manager) {
        return res.status(404).json({ message: "Manager Not Found" });
    }

    const compare = await bcryptjs.compare(req.body.oldPassword, manager.Password);
    if (!compare) {
        return res.status(400).json({ message: "Old Password is incorrect" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({ message: "New Password and Confirm Password do not match" });
    }

    manager.managerPassword = await bcryptjs.hash(req.body.newPassword, 10);
    await manager.save();
    res.status(200).json({ message: "Password changed successfully" });
}

module.exports.forgotPassword = async (req, res) => {
    let manager = await managerSchema.findOne({ Email: req.body.Email });
    if (!manager) {
        return res.status(404).json({ message: "Manager Not Found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    manager.resetOtp = otp;
    await manager.save();

    sendOtp(manager.Email, otp);
    res.status(200).json({ message: "OTP sent to email" });
}

module.exports.resetPassword = async (req, res) => {
    let manager = await managerSchema.findOne({ Email: req.body.Email, resetOtp: req.body.otp });
    if (!manager) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({ message: "New Password and Confirm Password do not match" });
    }

    manager.Password = await bcryptjs.hash(req.body.newPassword, 10);
    await manager.save();

    res.status(200).json({ message: "Password reset successfully" });
}

