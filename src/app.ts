import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import users from '../routes/users'
import pins from '../routes/pins'
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const cors = require("cors");
// const usersRouter = require("../routes/users");
// const pinsRouter = require("../routes/pins");
dotenv.config();
const PORT = process.env.PORT;
const app = express();

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(cors({ origin: "*" }));
// app.use(express.static(path.join(__dirname, "public")));

// Parse JSON-encoded request bodies

app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

//Routes
app.use(users);
app.use(pins)

app.get('/', (req: Request, res: Response) => res.send('HOla'))
app.listen(PORT, () => {
  console.log(`♻️ 🦝 listening on port ${PORT} 🐼 ♻️ `);
});

module.exports = app;
