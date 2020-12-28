let jwt = require("jsonwebtoken");
const config = require("./config.js");

const getToken = (req) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  return token;
};

class CheckToken {
  static isLoggedIn(req, res, next) {
    const token = getToken(req);
    if (!token) {
      return res.json({
        success: false,
        message: "Auth token is not supplied",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        console.log("token decoded, text", decoded);
        console.log("you are logged in! congrats");
        next();
      }
    });
  }

  static isOwner(req, res, next) {
    const token = getToken(req);
    if (!token) {
      return res.json({
        success: false,
        message: "Auth token is not supplied",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        console.log("token decoded, text", decoded);
        if (!decoded.isOwner) {
          return res.status(403).json({
            success: false,
            message: "You are not an owner of this site",
          });
        }
        console.log("you are an owner! congrats!");
        next();
      }
    });
  }

  static isAdmin(req, res, next) {
    const token = getToken(req);
    if (!token) {
      return res.json({
        success: false,
        message: "Auth token is not supplied",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        console.log("token decoded, text", decoded);
        if (!decoded.isAdmin) {
          return res.status(403).json({
            success: false,
            message: "You are not an admin of this site",
          });
        }
        console.log("you are an ADMIN, congrats!");
        next();
      }
    });
  }
}

module.exports = {
  CheckToken: CheckToken,
};
