const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/Users');

// Helper to generate a random username
const generateUsername = (email) => {
  const namePart = email.split('@')[0];
  const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
  // Ensure min length 3
  if (namePart.length < 3) {
    return `${namePart}user${randomSuffix}`;
  }
  return `${namePart}${randomSuffix}`;
};

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL

},
  async (_accessToken, __refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      // If user exists with googleId, login
      if (user) {
        // sync profile photo if user doesn't have one
        if (!user.profileImage && profile.photos && profile.photos.length > 0) {
          user.profileImage = profile.photos[0].value;
          await user.save();
        }
        return done(null, user);
      }

      // Check if user exists with same email but different login method
      const email = profile.emails?.[0]?.value;
      if (!email) {
        return done(new Error("No email found in Google profile"), null);
      }

      user = await User.findOne({ email: email });

      if (user) {
        // Link google account to existing email user
        if (!user.googleId) {
          user.googleId = profile.id;
          // If they verified via Google, we can mark email as verified
          if (!user.isVerified) user.isVerified = true;
          // Set profile image if not present
          if (!user.profileImage && profile.photos && profile.photos.length > 0) {
            user.profileImage = profile.photos[0].value;
          }
          await user.save();
        }
        return done(null, user);
      } else {
        // Create new user
        const newUsername = generateUsername(email);
        const newProfileImage = (profile.photos && profile.photos.length > 0) ? profile.photos[0].value : "";

        user = await User.create({
          googleId: profile.id,
          email: email,
          username: newUsername,
          isVerified: true,
          role: 'user', 
        });
        return done(null, user);
      }
    } catch (error) {
      return done(error, null);
    }
  }
))

module.exports = passport;