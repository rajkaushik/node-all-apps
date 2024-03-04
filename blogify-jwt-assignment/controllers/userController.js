const { GenerateToken, isTokenAuthorized } = require("../auth/jwt");
const userService = require("../services/userServices");

const RegisterUser = async (req, res) => {
  try {
    await userService.RegisterUser(req.body);
    res.status(200).send({ status: 200, message: "User added successfully" });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    await userService.CheckUser(req.body);
    res.status(200).send({ status: 200, token: GenerateToken(req.body) });
  } catch (err) {
    res.send({ status: 404, message: err.message });
  }
};

const IsTokenOk = (req, res) => {
  let result = isTokenAuthorized(req.headers.authorization);
  try {
    if (result) {
      res.status(200).send({ status: 200, isAuthenticated: result });
    }
  } catch (err) {
    res.send({ status: 404, message: err.message });
  }
};

module.exports = { RegisterUser, LoginUser, IsTokenOk };
