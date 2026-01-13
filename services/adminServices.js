const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/jwt'); 

const adminFilePath = path.join(__dirname, "../data/adminData.json");
const userFilePath = path.join(__dirname, "../data/usersData.json");

// Helper function to read files
const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

// Helper function to write files
const writeFile = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// --- Admin Services ---

const createAdmin = async (adminData) => {
    const admins = await readFile(adminFilePath);
    
    // 1. Check if admin already exists
    if (admins.find(a => a.username === adminData.username)) {
        throw new Error("Admin already exists");
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    const newAdmin = { ...adminData, password: hashedPassword };
    
    // 3. Save to file
    admins.push(newAdmin);
    await writeFile(adminFilePath, admins);

    // 4. Generate JWT Token
    // We pass the payload (username and role) to your signToken utility
    const token = signToken({ username: newAdmin.username, role: 'admin' });
    
    // 5. Return admin data (without password) and the token
    const { password, ...adminWithoutPassword } = newAdmin;
    return {
        admin: adminWithoutPassword,
        token: token
    };
};

const getAllAdmins = async () => {
    return await readFile(adminFilePath);
};

const deleteAdmin = async (username) => {
    const admins = await readFile(adminFilePath);
    const updatedAdmins = admins.filter(a => a.username !== username);
    await writeFile(adminFilePath, updatedAdmins);
    return true;
};

// --- User Services ---

const getAllUsers = async () => {
    return await readFile(userFilePath);
};

const deleteUser = async (username) => {
    const users = await readFile(userFilePath);
    const updatedUsers = users.filter(u => u.username !== username);
    await writeFile(userFilePath, updatedUsers);
    return true;
};
// --- Admin Login Service ---

const loginAdmin = async (username, password) => {
    const admins = await readFile(adminFilePath);
    

    const admin = admins.find(a => a.username === username);
    if (!admin) {
        throw new Error("Invalid username or password");
    }

 
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new Error("Invalid username or password");
    }

 
    const token = signToken({ username: admin.username, role: 'admin' });

    const { password: _, ...adminData } = admin;
    return {
        admin: adminData,
        token: token
    };
};
module.exports = {
    createAdmin,
    getAllAdmins,
    deleteAdmin,
    getAllUsers,
  deleteUser,
  loginAdmin
};