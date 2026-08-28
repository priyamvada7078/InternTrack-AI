const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        // Support string company name or Organization ObjectId for flexibility
        company: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },

        role: {
            type: String,
            trim: true,
        },

        location: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: ["Internship", "Full-Time", "Part-Time"],
            default: "Internship",
        },

        mode: {
            type: String,
            enum: ["Remote", "Hybrid", "Onsite"],
            default: "Remote",
        },

        stipend: {
            type: String,
            default: "0",
        },

        appliedDate: {
            type: Date,
            default: Date.now,
        },

        applicationLink: {
            type: String,
            default: "",
        },

        notes: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "Applied",
                "OA",
                "Interview",
                "Offer",
                "Rejected",
                "Accepted"
            ],
            default: "Applied",
        },

        appliedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Internship", internshipSchema);