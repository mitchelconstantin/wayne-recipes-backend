let jwt = require("jsonwebtoken");
let config = require("../config");
const { db } = require("./database");
const bcrypt = require("bcrypt");

class LoginHandler {
  static async login(req, res) {
    const { email, password } = req.body.data.user;
    const [user] = await db.any('select * from "users" WHERE "email" = $1 ', [
      email,
    ]);

    if (user && bcrypt.compareSync(password, user.hash)) {
      let token = jwt.sign(
        {
          email: email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
          isOwner: user.isOwner,
        },
        config.secret,
        {
          // expiresIn: "24h", // expires in 24 hours
        }
      );
      res.json({
        success: true,
        message: "Authentication successful!",
        token: token,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
  }

  index(req, res) {
    res.json({
      success: true,
      message: "Index page",
    });
  }
}

module.exports = {
  LoginHandler: LoginHandler,
};
