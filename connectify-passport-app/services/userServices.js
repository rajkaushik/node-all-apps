const userRepo = require('../repository/userRepository');

const RegisterUser = async (user) => {
    let isExist = await userRepo.CheckUser(user.email);
    if(isExist !== null) {
        throw Error(`User with email ${user.email} already exists`);
    } else {
        await userRepo.RegisterUser(user);
    }
}


module.exports = {RegisterUser};