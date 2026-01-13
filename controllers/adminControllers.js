const adminServices = require("../services/adminServices");

// Create admin
const createAdmin = async (req, res) => {
    try {
        const admin = await adminServices.createAdmin(req.body);
        res.status(201).json({ isStatus: true, msg: "Admin created successfully", data: admin });
    } catch (error) {
        res.status(403).json({ isStatus: false, msg: error.message, data: null });
    }
};

// Get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminServices.getAllAdmins();
        res.status(200).json({ isStatus: true, msg: "Admins fetched successfully", data: admins });
    } catch (error) {
        res.status(500).json({ isStatus: false, msg: "Internal Server Error", data: null });
    }
};

// Get all users
const getAllUserController = async (req, res) => {
    try {
        const users = await adminServices.getAllUsers();
        res.status(200).json({ isStatus: true, msg: "Users fetched successfully", data: users });
    } catch (error) {
        res.status(500).json({ isStatus: false, msg: "Internal Server Error", data: null });
    }
};

// Delete user
const deleteUserController = async (req, res) => {
    try {
        await adminServices.deleteUser(req.params.username);
        res.status(200).json({ isStatus: true, msg: "User deleted successfully", data: null });
    } catch (error) {
        res.status(500).json({ isStatus: false, msg: "Internal Server Error", data: null });
    }
};

// Delete admin
const deleteAdmin = async (req, res) => {
    try {
        await adminServices.deleteAdmin(req.params.username);
        res.status(200).json({ isStatus: true, msg: "Admin deleted successfully", data: null });
    } catch (error) {
        res.status(500).json({ isStatus: false, msg: "Internal Server Error", data: null });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await adminServices.loginAdmin(username, password);
        
        res.status(200).json({ 
            isStatus: true, 
            msg: "Login successful", 
            data: result 
        });
    } catch (error) {
        res.status(401).json({ 
            isStatus: false, 
            msg: error.message, 
            data: null 
        });
    }
};


module.exports = {
    createAdmin,
    getAllAdmins,
    getAllUserController,
    deleteUserController,
  deleteAdmin,
  loginAdmin
};
