"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
require("dotenv").config({ path: ".env.local" });
const { ConvexHttpClient } = require("convex/browser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const client = new ConvexHttpClient(process.env["CONVEX_URL"]);
const router = express_1.Router();
//Select all users
router.get("/api/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const use = yield client.query("getUsers");
        res.json(use);
    }
    catch (reason) {
        console.log("API/users error:", reason);
        res.status(500).send();
    }
}));
//Select individual users
router.get("/api/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const users = yield client.query("getUsers");
        const user = users.find((u) => id === u._id.toString());
        res.json(user);
    }
    catch (err) {
        console.log("API/users error:", err);
        res.status(500).send();
    }
}));
router.post("/api/users/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   // Our register logic starts here
    try {
        //     // Get user input
        const { username, email, password } = req.body;
        const users = yield client.query("getUsers");
        const user = users.find((u) => email === u.email);
        if (user) {
            return res.json(`There is already a registered user with ${email}`);
        }
        client.mutation("createUser", {
            email: email,
            username: username,
            password: password,
        });
        res.send(`The record has been created`);
    }
    catch (err) {
        console.log("Query failed:", err);
        res.send(`Query failed: ${err}`);
    }
}));
//Login
router.post("/api/users/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //     //email check
        const { username, email, password } = req.body;
        const users = yield client.query("getUsers");
        const user = users.find((u) => email === u.email);
        if (!user) {
            return res.json(`There are no records with the ${email} email. Please register.`);
        }
        const validPassword = user.email === email;
        if (!validPassword) {
            return res.status(401).json("Please verify your password");
        }
        res.status(200).json({ user: user, message: "loggedIn" });
    }
    catch (error) {
        console.log("Query error:", error);
    }
}));
exports.default = router;
