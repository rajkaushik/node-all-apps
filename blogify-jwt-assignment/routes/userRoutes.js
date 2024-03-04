const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/login", userController.LoginUser);
userRouter.post("/login/isAuthenticated", userController.IsTokenOk);

userRouter.post("/register", userController.RegisterUser);

module.exports = { userRouter };
