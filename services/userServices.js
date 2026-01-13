const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/jwt');



const filePath = path.join(__dirname , "../data/usersData.json");

// Helper function to read all users
const getAll = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};



// login user
const getUser = async (username, password) => {
    const allUsers = await getAll();
    const user = allUsers.find(u => u.username === username);
    if (!user) throw new Error("User not found");
    const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  
  const token = signToken({ username: user.username, email: user.email, role: user.role })
  
  return { token, user: { username: user.username, email: user.email, role: user.role } };
};

// resetting user password
const reset = async (username, password) => {
    const allUsers = await getAll();
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUsers = allUsers.map(u =>
        u.username === username ? { ...u, password: hashedPassword } : u
    );

    await fs.writeFile(filePath, JSON.stringify(updatedUsers, null, 2));
    return true;
};


//updating user details
const updateUser = async (username, { newUsername, email }) => {
    const allUsers = await getAll();
    const updatedUsers = allUsers.map(u =>
        u.username === username
            ? {
                ...u,
                username: newUsername || u.username,
                email: email || u.email
            }
            : u
    );
    await fs.writeFile(filePath, JSON.stringify(updatedUsers, null, 2));
    return updatedUsers.find(u => u.username === (newUsername || username));
}

const createUser = async ({ username, email, password }) => {
    const allUsers = await getAll();

    // Checking if a user exists!
    if (allUsers.find(u => u.username === username)) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        username,
        email,
        role : "user",
        password: hashedPassword,
        createdAt: new Date().toISOString()
    };

    allUsers.push(newUser);
  await fs.writeFile(filePath, JSON.stringify(allUsers, null, 2));
  const token = signToken({username: newUser.username, email: newUser.email, role: newUser.role } )
    return { token , user :  {username: newUser.username, email: newUser.email, role: newUser.role } };
};

module.exports = {
    getUser,
    reset,
    createUser,
    updateUser,
    getAll
}