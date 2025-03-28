const adminSchema = require('../model/adminSchema');
const employeeSchema = require('../model/employeeSchema');
const managerSchema = require('../model/managerSchema');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOtp } = require('../middleware/mailer');
const fs = require('fs');





module.exports.adminRegister = async (req, res) => {
    req.body.image = req.file.path
    console.log(req.body.adminPassword)


    let admin = req.body.Email
    if (admin)
        req.body.adminPassword = await bcryptjs.hash(req.body.adminPassword, 10);
    await adminSchema.create(req.body).then((data) => {
        res.status(200).json({ message: "Admin Created Successfully", data });
    })



}

module.exports.adminLogin = async (req, res) => {
    console.log(req.body.adminPassword);
 console.log(req.body.Email)
    let admin = await adminSchema.findOne({ Email: req.body.Email });
    console.log(admin);

    if (!admin) {
        console.log("Admin not found for email:", req.body.Email);
        return res.status(200).json({ message: "Admin Not Found" });
    }


    if (await bcryptjs.compare(req.body.adminPassword, admin.adminPassword)) {
        console.log(req.body.adminPassword);

        let token = jwt.sign({ adminData: admin }, "employee000", { expiresIn: "3h" });
        res.status(200).json({ message: "Admin Log In", token: token });
        console.log(token);
    } else {
        res.status(200).json({ message: "Password is wrong" });
    }
};



module.exports.managerList = async (req, res) => {
    await managerSchema.find({}).then((data) => {
        res.status(200).json({ message: "All Manager Data", data });
    });
}
module.exports.employeeList = async (req, res) => {
    await employeeSchema.find({}).then((data) => {
        res.status(200).json({ message: "All employee Data", data });
    });
}
module.exports.adminList = async (req, res) => {
    await adminSchema.find({}).then((data) => {
        res.status(200).json({ message: "All Admin Data", data });
    })
}

module.exports.deleteAdmin = async (req, res) => {
    await adminSchema.findByIdAndDelete(req.query.id).then((data) => {
        if (fs.existsSync(data.image)) {
            fs.unlinkSync(data.image);
        }
        res.status(200).json({ message: "This Admin Are Deleted", data })
    })
}

module.exports.updateAdmin = async (req, res) => {
    if (req.user.adminData._id !== req.query.id) {
        return res.status(403).json({ message: "Access denied. You can only update your own profile." });
    }

    const data = await adminSchema.findByIdAndUpdate(req.query.id, req.body, { new: true });
    if (!data) {
        return res.status(404).json({ message: "Admin not found" });
    }
    if (fs.existsSync(data.image)) {
        fs.unlinkSync(data.image);
    }
    res.status(200).json({ message: "Admin is Updated", data });
}
module.exports.adminProfile = async (req, res) => {
    try {
        const email = req.query.Email; // Correctly extract Email from query params

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const profile = await adminSchema.findOne({ Email: email });

        if (!profile) {
            return res.status(404).json({ message: "Admin Not Found" });
        }

        console.log("Admin Profile Found:", profile);
        res.status(200).json({ message: "Admin Profile", data: profile });

    } catch (error) {
        console.error("Error fetching admin:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



module.exports.adminChangePassword = async (req, res) => {
    let admin = await adminSchema.findById(req.user.adminData._id);
    if (!admin) {
        return res.status(404).json({ message: "Admin Not Found" });
    }

    const compare = await bcryptjs.compare(req.body.oldPassword, admin.Password);
    if (!compare) {
        return res.status(400).json({ message: "Old Password is incorrect" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({ message: "New Password and Confirm Password do not match" });
    }
    admin.adminPassword = await bcryptjs.hash(req.body.newPassword, 10);
    await admin.save();
    res.status(200).json({ message: "Password changed successfully" });
}

module.exports.forgotPassword = async (req, res) => {
    let admin = await adminSchema.findOne({ adminEmail: req.body.Email });
    if (!admin) {
        return res.status(404).json({ message: "Admin Not Found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.resetOtp = otp;
    await admin.save();

    sendOtp(admin.adminEmail, otp);
    res.status(200).json({ message: "OTP sent to email" });
}


