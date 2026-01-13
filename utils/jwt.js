const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;

const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: EXPIRES_IN,
  });
};

module.exports = { signToken };
