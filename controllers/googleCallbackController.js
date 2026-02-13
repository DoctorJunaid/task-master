const { signToken } = require("../utils/jwt");

const googleCallbackController = async (req, res) => {
  if (!req.user) {
    return res.redirect(process.env.FRONT_END_URL + "/login?error=google_failed");
  }
  const token = signToken({
    username: req.user.username,
    email: req.user.email,
    id: req.user._id,
    role: req.user.role
  })
  
  // set cookies 
  res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
  
  
  // 3. Redirect to frontend
      res.redirect(process.env.FRONT_END_URL);
};  
module.exports = googleCallbackController;
