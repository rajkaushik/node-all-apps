const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const CheckUser = async (email) => {
    return await User.findOne({email: email});
}

const RegisterUser = async (user) => {
    console.log(user)
   let newUser = new User({
        "username": user.username,
        "email": user.email,
        "password": bcrypt.hashSync(user.password),
        "_id": uuidv4(),
   })
   await newUser.save();
}

module.exports = {RegisterUser, CheckUser};