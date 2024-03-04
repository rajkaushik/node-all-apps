const bcrypt = require('bcryptjs');
const userRepo = require('../repository/userRepository');

const RegisterUser = async (user) => {
    let findUser = await userRepo.CheckUser(user.email);
    if(findUser !== null){
        throw Error(`User ${user.email} already exists`);
    } else {
        await userRepo.RegisterUser(user);
    }
}

const CheckUser = async (user) => {
    let findUser = await userRepo.CheckUser(user.email);
    if(findUser !== null){
        if(bcrypt.compareSync(user.password, findUser.password)){
            return true;
        } else {
            throw Error(`User ${user.email} password not correct, try again`);
        }
    } else {
        throw Error(`User ${user.email} Does not exists`);
    }
    
}

module.exports = {RegisterUser, CheckUser};