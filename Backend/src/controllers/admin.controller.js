const User = require("../models/user.model");

const getDashboard = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        const totalAdmins = await User.countDocuments({
            role: "admin",
        });

        res.status(200).json({
            success: true,
            totalUsers,
            totalAdmins,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    getDashboard,
};