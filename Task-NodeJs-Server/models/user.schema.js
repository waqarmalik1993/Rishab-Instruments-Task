const mongoose = require('mongoose');
const { isEmail, } = require('validator')
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    mobile_number: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    company_name:  {
      type: String,
      trim: true,
  },
},
    {
        timestamps: true
    }
);


// Hash the password before saving a new user to the database
User.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to verify user password during login
User.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('user', User);