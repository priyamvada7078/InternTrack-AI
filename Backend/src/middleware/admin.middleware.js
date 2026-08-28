const jwt= require("jsonwebtoken");
const ROLES = require("../constants/roles");
const adminMiddleware = (req, res, next) => {
    try {
        if(req.user.role !== ROLES.ADMIN) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only.",
            });
        }
  
    next();
}
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while checking admin privileges.",
        });
    }   
}
        module.exports = adminMiddleware;