const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
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
            type: Number,
            default: 0,
        },

        applicationLink: {
            type: String,
            required: true,
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