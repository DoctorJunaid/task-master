const userServices = require('../services/userServices');

// controller for signUp a user
const createUserController = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password) return res.status(400).json({isStatus: false, msg: "Please provide all required fields", data: null});
        const user = await userServices.createUser({username, email, password});
        res.status(201).json({isStatus: true, msg: "User created successfully", data: user});
    }catch(error){
        res.status(500).json({isStatus: false, msg: "Internal Server Error", data: null});
    }
}

//controller for updating user info

const updateUserController = async (req, res) => {
    try {
        const { username } = req.params; // The "current" username from the URL
        const { newUsername, email } = req.body; // The "new" data


        const user = await userServices.updateUser(username, { newUsername, email });
        res.status(200).json({ isStatus: true, msg: "Updated successfully", data: user });
    } catch (error) {
        res.status(500).json({ isStatus: false, msg: "Internal Server Error" });
    }
};

// controller for resetting password
const resetPasswordUserController = async (req, res) => {
    try{
        const {username } = req.params;
        const { password } = req.body;
        if(!username || !password) return res.status(400).json({isStatus: false, msg: "Please provide new password", data: null});
        await userServices.reset(username, password);
        res.status(200).json({isStatus: true, msg: "Password reset Successfully ", data: null});
    }catch(error){
        res.status(500).json({isStatus: false, msg: "Internal Server Error", data: null});
    }
}

// controller for logging in a user
const getUserController = async (req, res) => {
    try{
        const {username , password } = req.body;
        if(!username || !password) return res.status(400).json({isStatus: false, msg: "Please provide new password", data: null});
        const user = await userServices.getUser(username , password);
        res.status(200).json({isStatus: true, msg: "Login successfully", data: user});
    }catch(error){
        res.status(500).json({isStatus: false, msg: "Internal Server Error", data: null});
    }
}

// controller for getting all user info
const getAllUserController = async (req, res) => {
    try{
        const user = await userServices.getAll();
        res.status(200).json({isStatus: true, msg: "User details fetched successfully", data: user});
    }catch (error){
        res.status(500).json({isStatus: false, msg: "Internal Server Error", data: null});
    }
}
// controller for deleting a user
const deleteUserController = async (req, res) => {
    try{
         await userServices.deleteUser(req.params.username);
        res.status(200).json({isStatus: true, msg: "User deleted successfully", data: null});
    }catch (error){
        res.status(500).json({isStatus: false, msg: "Internal Server Error", data: null});
    }
}

module.exports = {
    createUserController,
    updateUserController,
    resetPasswordUserController,
    getUserController,
    getAllUserController,
    deleteUserController
};



