import { db } from "../../lib/database";
import bcrypt from "bcrypt";

export class UserHandler {
  static async getAllUsers(req, res) {
    const data = await db.any('select * from "users"');
    res.json(data);
  }
  static async createUser(req, res) {
    const { firstName, lastName, email, password } = req.body.data.user;
    const user = await db.any('select * from "users" WHERE "email" = $1 ', [
      email,
    ]);
    if (user.length) {
      return res.status(400).send({
        message: "that user already exists, please try logging in",
      });
    }
    const hash = bcrypt.hashSync(password, 10);
    await db.one(
      'INSERT INTO users("firstName", "lastName", "email", "hash") VALUES($1, $2, $3, $4) RETURNING email',
      [firstName, lastName, email, hash]
    );
    res.json("success");
  }
  static async updateUserPermission(req, res) {
    const { users } = req.body.data;
    users.forEach(async (user) => {
      await db.any('update "users" SET "isAdmin" = $2 WHERE "email" = $1', [
        user.email,
        user.isAdmin,
      ]);
    });
    res.json("success");
  }
}
