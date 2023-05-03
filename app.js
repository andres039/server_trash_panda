"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const pins_1 = __importDefault(require("./routes/pins"));
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const cors = require("cors");
// const usersRouter = require("../routes/users");
// const pinsRouter = require("../routes/pins");
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(cors({ origin: "*" }));
// app.use(express.static(path.join(__dirname, "public")));
// Parse JSON-encoded request bodies
app.use(express_1.default.json());
// Parse URL-encoded request bodies
app.use(express_1.default.urlencoded({ extended: true }));
//Routes
app.use(users_1.default);
app.use(pins_1.default);
app.get('/', (req, res) => res.send('HOla'));
app.listen(PORT, () => {
    console.log(`♻️ 🦝 listening on port ${PORT} 🐼 ♻️ `);
});
module.exports = app;
