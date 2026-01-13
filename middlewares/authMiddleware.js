const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const verifyToken = (req , res , next) => {
    const token = req.header['authorization']?.split(' ')[1] || req.cookies.token;

    if(!token) {
        return res.status(401).json({ isStatus: false, msg: "Access Denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;

        // 4. Move to the next function (the Controller)
        next();
    } catch (error) {
        res.status(403).json({ isStatus: false, msg: "Invalid or Expired Token" });
    }
}
module.exports = verifyToken
