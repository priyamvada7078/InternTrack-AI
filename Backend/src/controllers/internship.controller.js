const Internship = require("../models/internship.model");
const Organization = require("../models/organization.model");

// Create Internship
const createInternship = async (req, res) => {
    try {
        const {
            title,
            company,
            location,
            type,
            mode,
            stipend,
            applicationLink,
            status,
        } = req.body;

        const organization = await Organization.findById(company);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        const internship = await Internship.create({
            title,
            company,
            location,
            type,
            mode,
            stipend,
            applicationLink,
            status,
            appliedBy: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Internship created successfully",
            data: internship,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Internships
const getAllInternships = async (req, res) => {
    try {

        const {
            search,
            status,
            page = 1,
            limit = 5,
        } = req.query;

        let query = {};

        // Search
        if (search) {
            query.title = {
                $regex: search,
                $options: "i",
            };
        }

        // Status Filter
        if (status) {
            query.status = status;
        }

        const currentPage = Number(page);
        const pageSize = Number(limit);

        const internships = await Internship.find(query)
            .populate("company", "name website location")
            .populate("appliedBy", "name email")
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize);

        const total = await Internship.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            page: currentPage,
            totalPages: Math.ceil(total / pageSize),
            count: internships.length,
            data: internships,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Get Internship By ID
const getInternshipById = async (req, res) => {
    try {

        const internship = await Internship.findById(req.params.id)
            .populate("company", "name website location")
            .populate("appliedBy", "name email");

        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "Internship not found",
            });
        }

        res.status(200).json({
            success: true,
            data: internship,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Internship
const updateInternship = async (req, res) => {
    try {

        const internship = await Internship.findById(req.params.id);

        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "Internship not found",
            });
        }

        if (internship.appliedBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this internship",
            });
        }

        const updatedInternship = await Internship.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
            .populate("company", "name website location")
            .populate("appliedBy", "name email");

        res.status(200).json({
            success: true,
            message: "Internship updated successfully",
            data: updatedInternship,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Internship
const deleteInternship = async (req, res) => {
    try {

        const internship = await Internship.findById(req.params.id);

        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "Internship not found",
            });
        }

        if (internship.appliedBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this internship",
            });
        }

        await internship.deleteOne();

        res.status(200).json({
            success: true,
            message: "Internship deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Dashboard Statistics
const getDashboardStats = async (req, res) => {
    try {

        const total = await Internship.countDocuments({
            appliedBy: req.user.id,
        });

        const applied = await Internship.countDocuments({
            appliedBy: req.user.id,
            status: "Applied",
        });

        const oa = await Internship.countDocuments({
            appliedBy: req.user.id,
            status: "OA",
        });

        const interview = await Internship.countDocuments({
            appliedBy: req.user.id,
            status: "Interview",
        });

        const offer = await Internship.countDocuments({
            appliedBy: req.user.id,
            status: "Offer",
        });

        const rejected = await Internship.countDocuments({
            appliedBy: req.user.id,
            status: "Rejected",
        });

        const accepted = await Internship.countDocuments({
            appliedBy: req.user.id,
            status: "Accepted",
        });

        res.status(200).json({
            success: true,
            data: {
                total,
                applied,
                oa,
                interview,
                offer,
                rejected,
                accepted,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    createInternship,
    getAllInternships,
    getInternshipById,
    updateInternship,
    deleteInternship,
    getDashboardStats,
};