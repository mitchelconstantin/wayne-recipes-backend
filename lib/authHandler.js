let jwt = require("jsonwebtoken");
let config = require("../config");
const { db } = require("../lib/database");
const bcrypt = require("bcrypt");

class LoginHandler {
  static async login(req, res) {
    // console.log("req", req.body);
    const { email, password } = req.body.data.user;
    const [user] = await db.any('select * from "users" WHERE "email" = $1 ', [
      email,
    ]);

    if (user && bcrypt.compareSync(password, user.hash)) {
      let token = jwt.sign({ username: email }, config.secret, {
        //todo change this
        expiresIn: "24h", // expires in 24 hours
      });
      res.json({
        ...user,
        success: true,
        message: "Authentication successful!",
        token: token,
      });
    } else {
      console.log("sending err");
      res.sendStatus(403).json({
        success: false,
        message: "Incorrect username or password",
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
