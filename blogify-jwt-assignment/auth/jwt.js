const jwt = require("jsonwebtoken");

const GenerateToken = (user) => {
  let token = jwt.sign({ data: user }, "This is my secret key", {
    expiresIn: "1h",
  });
  return token;
};

function VerifyTokenMiddleware(req, res, next) {
  if (VerifyToken(req.headers.authorization)) {
    next();
  } else {
    res
      .status(401)
      .send({ message: "You are not authorized to access this endpoint" });
  }
}

const VerifyToken = (token) => {
  let isValid = jwt.verify(token, "This is my secret key", (err, decode) =>
    decode !== undefined ? decode : err
  );
  return !(isValid instanceof Error);
};

const isTokenAuthorized = (token) => {
  if (VerifyToken(token)) {
    return true;
  } else {
    return false;
  }
};

module.exports = { GenerateToken, VerifyTokenMiddleware, isTokenAuthorized };
