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
const client = new ConvexHttpClient(process.env["CONVEX_URL"]);
const router = express_1.Router();
//Select all pins
router.get("/api/pins", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pins = yield client.query("getPins");
        res.json(pins);
    }
    catch (err) {
        console.log("API/pins error:", err);
        res.status(500).send();
    }
}));
//Select individual pins
router.get("/api/pins/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pins = yield client.query("getPins");
        const pin = pins.find((p) => id === p._id.toString());
        res.json(pin);
    }
    catch (err) {
        console.log("API/pins error:", err);
        res.status(500).send();
    }
}));
//Delete individual pins
router.delete("/api/pins/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pins = yield client.query("getPins");
        const pinFound = pins.find((p) => id === p._id.toString());
        if (!pinFound) {
            res.send(`The record with id ${id} doesn't exist`);
            return;
        }
        client.mutation("deletePin", { id: pinFound._id });
        res.send(`The record with id ${id} has been deleted`);
    }
    catch (err) {
        console.log("API/pins error:", err);
        res.status(500).send();
    }
}));
//Update individual pins
router.put("/api/pins/:id/search/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, pinID, field, value } = req.body;
        //     await queries.updateIndividualPins(db, userID, pinID).then((response) => {
        //       res.json(response.rows);
        const { id } = req.params;
        // const { field, value } = req.query;
        const pins = yield client.query("getPins");
        const pinFound = pins.find((p) => id === p._id.toString());
        if (!pinFound) {
            res.send(`The record with id ${id} doesn't exist`);
            return;
        }
        console.log(field, value);
        client.mutation("updatePin", {
            id: pinFound._id,
            field: value,
        });
        res.send(`The record with id ${id} has been updated`);
    }
    catch (err) {
        console.error(err);
    }
}));
router.post("/api/pins/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, picture, condition, latitude, longitude, date, creator_id, claimer_id, } = req.body;
        //     await queries.updateIndividualPins(db, userID, pinID).then((response) => {
        //       res.json(response.rows);
        client.mutation("createPin", {
            title: title,
            description: description,
            picture: picture,
            condition: condition,
            latitude: latitude,
            longitude: longitude,
            date: date,
            creator_id: creator_id,
            claimer_id: claimer_id,
        });
        res.send(`The record has been created`);
    }
    catch (err) {
        console.error(err);
    }
}));
exports.default = router;
