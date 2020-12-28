let jwt = require("jsonwebtoken");
const config = require("./config.js");

let checkToken = (req, res, next) => {
  console.log("checking token");
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  console.log("token", token);
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        console.log("token decoded, text", decoded);
        next();
      }
    });
  } else {
    console.log("should be in here");
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};

module.exports = {
  checkToken: checkToken,
};
