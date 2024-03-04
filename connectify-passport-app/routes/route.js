const express = require('express');
const passport = require('passport');
const userContoller = require('../controllers/userContoller');
const {isLoggedIn, logoutUser} = require('../middleware/middleware')
 
const router = express.Router();

// render page
router.get('/', userContoller.RenderHomePage);
router.get('/login', userContoller.RenderLoginPage)
router.get('/register', userContoller.RenderRegisterPage);
router.get('/friends', isLoggedIn, userContoller.RenderFriendsPage);

router.post('/register', userContoller.RegisterUser);
router.post('/login', passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("/friends");
});
router.post('/logout', logoutUser);

module.exports = router;