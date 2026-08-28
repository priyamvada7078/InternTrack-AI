const Organization = require("../models/organization.model");


// Create Organization
const createOrganization = async (req, res) => {
    try {
        const { name, description, website, location, logo } = req.body;

        const organization = await Organization.create({
            name,
            description,
            website,
            location,
            logo,
            createdBy: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Organization created successfully",
            data: organization,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Get All Organizations
const getAllOrganizations = async (req, res) => {
    try {

        const organizations = await Organization.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: organizations.length,
            data: organizations,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Get Organization By ID
const getOrganizationById = async (req, res) => {
    try {

        const organization = await Organization.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        res.status(200).json({
            success: true,
            data: organization,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Update Organization
const updateOrganization = async (req, res) => {
    try {

        const organization = await Organization.findById(req.params.id);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        // Only creator can update
        if (organization.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this organization",
            });
        }

        const updatedOrganization = await Organization.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Organization updated successfully",
            data: updatedOrganization,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Delete Organization
const deleteOrganization = async (req, res) => {
    try {

        const organization = await Organization.findById(req.params.id);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        // Only creator can delete
        if (organization.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this organization",
            });
        }

        await organization.deleteOne();

        res.status(200).json({
            success: true,
            message: "Organization deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization,
};