import { Router } from "express";
require("dotenv").config({ path: ".env.local" });

const { ConvexHttpClient } = require("convex/browser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const client = new ConvexHttpClient(process.env["CONVEX_URL"]);
type User = Record<
  "email" | "username" | "password" | "_id",
  string | string | string
>;

const router = Router();

//Select all users

router.get("/api/users", async (req, res) => {
  try {
    const use = await client.query("getUsers");
    res.json(use);
  } catch (reason) {
    console.log("API/users error:", reason);
    res.status(500).send();
  }
});

//Select individual users

router.get("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const users = await client.query("getUsers");
    const user = users.find((u: User) => id === u._id.toString());
    res.json(user);
  } catch (err) {
    console.log("API/users error:", err);
    res.status(500).send();
  }
});

router.post("/api/users/register", async (req, res) => {
  //   // Our register logic starts here
  try {
    //     // Get user input
    const { username, email, password } = req.body;
    const users = await client.query("getUsers");
    const user = users.find((u: User) => email === u.email);
    if (user) {
      return res.json(`There is already a registered user with ${email}`);
    }
    client.mutation("createUser", {
      email: email,
      username: username,
      password: password,
    });
    res.send(`The record has been created`);
  } catch (err) {
    console.log("Query failed:", err);
    res.send(`Query failed: ${err}`);
  }
});

//Login

router.post("/api/users/login", async (req, res) => {
  try {
    //     //email check
    const { username, email, password } = req.body;
    const users = await client.query("getUsers");
    const user = users.find((u: User) => email === u.email);
    if (!user) {
      return res.json(
        `There are no records with the ${email} email. Please register.`
      );
    }
    const validPassword = user.email === email;
    if (!validPassword) {
      return res.status(401).json("Please verify your password");
    }
    res.status(200).json({ user: user, message: "loggedIn" });
  } catch (error) {
    console.log("Query error:", error);
  }
});

export default router;
