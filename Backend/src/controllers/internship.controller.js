const Internship = require("../models/internship.model");

// Create Internship
const createInternship = async (req, res) => {
    try {
        const {
            title,
            role,
            company,
            location,
            type,
            mode,
            stipend,
            applicationLink,
            appliedDate,
            notes,
            status,
        } = req.body;

        const finalTitle = role || title || "Software Engineer Intern";
        const finalCompany = typeof company === "object" ? company?.name || "Company" : (company || "Company");

        const internship = await Internship.create({
            title: finalTitle,
            role: role || finalTitle,
            company: finalCompany,
            location: location || "Remote",
            type: type || "Internship",
            mode: mode || "Remote",
            stipend: stipend ? String(stipend) : "0",
            applicationLink: applicationLink || "",
            appliedDate: appliedDate ? new Date(appliedDate) : new Date(),
            notes: notes || "",
            status: status || "Applied",
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

// Get All Internships (filtered by current user)
const getAllInternships = async (req, res) => {
    try {
        const {
            search,
            status,
            mode,
            page = 1,
            limit = 50,
        } = req.query;

        let query = {};
        if (req.user?.id) {
            query.appliedBy = req.user.id;
        }

        // Search
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { role: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
            ];
        }

        // Status Filter
        if (status && status !== "All") {
            query.status = status;
        }

        // Mode Filter
        if (mode && mode !== "All") {
            query.mode = mode;
        }

        const currentPage = Number(page);
        const pageSize = Number(limit);

        const internships = await Internship.find(query)
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize);

        const total = await Internship.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            page: currentPage,
            totalPages: Math.ceil(total / pageSize) || 1,
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
        const internship = await Internship.findById(req.params.id);

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

        const updateData = { ...req.body };
        if (updateData.role && !updateData.title) {
            updateData.title = updateData.role;
        }
        if (typeof updateData.company === "object" && updateData.company?.name) {
            updateData.company = updateData.company.name;
        }

        const updatedInternship = await Internship.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

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

// Dashboard Statistics & Analytics Aggregation
const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;

        const total = await Internship.countDocuments({ appliedBy: userId });
        const applied = await Internship.countDocuments({ appliedBy: userId, status: "Applied" });
        const oa = await Internship.countDocuments({ appliedBy: userId, status: "OA" });
        const interview = await Internship.countDocuments({ appliedBy: userId, status: "Interview" });
        const offer = await Internship.countDocuments({ appliedBy: userId, status: "Offer" });
        const rejected = await Internship.countDocuments({ appliedBy: userId, status: "Rejected" });
        const accepted = await Internship.countDocuments({ appliedBy: userId, status: "Accepted" });

        // Calculate dynamic momentum score (0-100)
        // Weight: applied (1), OA (3), interview (6), offer (10)
        const rawScore = total === 0 ? 0 : Math.min(100, Math.round(
            (applied * 2 + oa * 5 + interview * 10 + offer * 20) / Math.max(1, total * 0.2)
        ));
        const momentumScore = total === 0 ? 50 : Math.max(20, Math.min(100, rawScore));

        // Response rate: (oa + interview + offer) / total
        const responses = oa + interview + offer;
        const responseRate = total > 0 ? `${Math.round((responses / total) * 100)}%` : "0%";

        // Fetch recent movement
        const recentMovements = await Internship.find({ appliedBy: userId })
            .sort({ updatedAt: -1, createdAt: -1 })
            .limit(5);

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
                momentumScore,
                responseRate,
                recentMovements,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Analytics Data Aggregates for Charts & Funnels
const getAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;
        const total = await Internship.countDocuments({ appliedBy: userId });
        const applied = await Internship.countDocuments({ appliedBy: userId, status: "Applied" });
        const oa = await Internship.countDocuments({ appliedBy: userId, status: "OA" });
        const interview = await Internship.countDocuments({ appliedBy: userId, status: "Interview" });
        const offer = await Internship.countDocuments({ appliedBy: userId, status: "Offer" });
        const rejected = await Internship.countDocuments({ appliedBy: userId, status: "Rejected" });

        const responseCount = oa + interview + offer;
        const responseRate = total > 0 ? `${((responseCount / total) * 100).toFixed(1)}%` : "0.0%";
        const interviewConversion = total > 0 ? `${((interview / total) * 100).toFixed(1)}%` : "0.0%";
        const offerRate = total > 0 ? `${((offer / total) * 100).toFixed(1)}%` : "0.0%";
        const rejectionRate = total > 0 ? `${((rejected / total) * 100).toFixed(1)}%` : "0.0%";

        const statusDistribution = [
            { name: "Applied", value: applied, color: "#6366F1" },
            { name: "OA", value: oa, color: "#F59E0B" },
            { name: "Interview", value: interview, color: "#8B5CF6" },
            { name: "Offer", value: offer, color: "#10B981" },
            { name: "Rejected", value: rejected, color: "#EF4444" },
        ];

        const funnelStages = [
            { stage: "Applied", count: total, rate: "100%" },
            { stage: "Online Assessment", count: oa + interview + offer, rate: total > 0 ? `${(((oa + interview + offer) / total) * 100).toFixed(1)}%` : "0%" },
            { stage: "Interview", count: interview + offer, rate: total > 0 ? `${(((interview + offer) / total) * 100).toFixed(1)}%` : "0%" },
            { stage: "Offer Received", count: offer, rate: total > 0 ? `${((offer / total) * 100).toFixed(1)}%` : "0%" },
        ];

        // Group by month
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);

        const monthlyStats = await Internship.aggregate([
            {
                $match: {
                    appliedBy: new (require("mongoose").Types.ObjectId)(userId),
                    createdAt: { $gte: sixMonthsAgo },
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                    applications: { $sum: 1 },
                    interviews: {
                        $sum: {
                            $cond: [{ $in: ["$status", ["Interview", "Offer"]] }, 1, 0],
                        },
                    },
                    offers: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Offer"] }, 1, 0],
                        },
                    },
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
        ]);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyData = monthlyStats.map((item) => ({
            month: monthNames[item._id.month - 1],
            applications: item.applications,
            interviews: item.interviews,
            offers: item.offers,
        }));

        res.status(200).json({
            success: true,
            data: {
                metrics: {
                    responseRate,
                    interviewConversion,
                    offerRate,
                    rejectionRate,
                    interviewCount: interview,
                    offerCount: offer,
                    rejectionCount: rejected,
                },
                statusDistribution,
                funnelStages,
                monthlyData: monthlyData.length > 0 ? monthlyData : [
                    { month: "Jan", applications: 0, interviews: 0, offers: 0 }
                ],
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
    getAnalytics,
};