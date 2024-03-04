const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');


const CheckUser = async (email) => {
    return await User.findOne({email: email});
}

const RegisterUser = async (user) => {
    let newUser = new User();
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.password = bcrypt.hashSync(user.password);
    newUser._id = uuidv4();
    return await newUser.save();
}

module.exports = {CheckUser, RegisterUser};