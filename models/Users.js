const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    minlength: 3,
    unique: true,
  },
  googleId: {
    type: String,
    unique: true , 
    sparse : true 
  },
  email: {
    type: String,
    required: [true, "email is required"],
    lowercase: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    password: {
      type: String,
      required: function () { return !this.googleId; },
      minlength : 6,
      select: false 
  },
  isVerified: {
    type: Boolean,
    default : false
  },
  verificationToken: {
    type: String,
    default: null
  },
  verificationTokenExpires: {
    type: Date,
    default: null
  },
 
  }, {
    
  timestamps: true
    });

const User = mongoose.model('User', userSchema);

module.exports = User;
