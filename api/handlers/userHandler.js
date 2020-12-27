const { db } = require("../../lib/database");

class UserHandler {
  static async getAllUsers(req, res) {
    const data = await db.any('select * from "users"');
    res.json(data);
  }
  static async createUser(req, res) {
    const { firstName, lastName, email, password } = req.body.user;
    const user = await db.any('select * from "users" WHERE "email" = $1 ', [
      email,
    ]);
    if (user.length) {
      return res.status(400).send({
        message: "username already exists",
      });
    }
    const hash = bcrypt.hashSync(password, 10);
    const newUser = await db.one(
      'INSERT INTO users("firstName", "lastName", "email", "hash") VALUES($1, $2, $3, $4) RETURNING email',
      [firstName, lastName, email, hash]
    );
    res.json("success");
  }
  static async updateUserPermission(req, res) {
    const { users } = req.body;
    users.forEach(async (user) => {
      await db.any('update "users" SET "isAdmin" = $2 WHERE "email" = $1', [
        user.email,
        user.isAdmin,
      ]);
    });
    res.json("success");
  }
  // static async login(req, res) {
  //   const { email, password } = req.body.user;
  //   const [user] = await db.any('select * from "users" WHERE "email" = $1 ', [
  //     email,
  //   ]);
  //   const newHash = bcrypt.hashSync(password, 10);

  //   if (!user || !bcrypt.compareSync(password, user.hash)) {
  //     //if no user or if password and hash do not match
  //     return res.status(400).send({
  //       message: "Incorrect login",
  //     });
  //   }
  //   res.json(user);
  // }
}
module.exports = {
  UserHandler: UserHandler,
};
