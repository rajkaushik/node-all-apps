const passport = require('passport');
const userService = require('../services/userServices');

const RenderRegisterPage = (req, res) => {
    res.render('pages/register');
}

const RenderLoginPage = (req, res) => {
    res.render('pages/login');
}

const RenderHomePage = (req, res) => {
    res.render('pages/home');
}

const RenderFriendsPage = async (req, res) => {
    const users = await fetch('https://dummyjson.com/user').then(res => res.json())
    .then(data => {
        return data?.users;
    });
    users.length = 9;
    res.render('pages/friends', {
        users: users
    });
}

const RegisterUser = async (req, res) => {
    try {
        await userService.RegisterUser(req.body);
        res.redirect("/");
    } catch(err){
        console.log(err.message);
    }
}



module.exports = {RegisterUser, RenderRegisterPage, RenderLoginPage, RenderHomePage, RenderFriendsPage};