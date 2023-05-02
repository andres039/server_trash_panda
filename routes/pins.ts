import { Router } from "express";

require("dotenv").config({ path: ".env.local" });

const { ConvexHttpClient } = require("convex/browser");

const client = new ConvexHttpClient(process.env["CONVEX_URL"]);

type Pin = Record<
  | "_id"
  | "title"
  | "description"
  | " picture"
  | "condition"
  | "latitude"
  | "longitude"
  | "date"
  | "creator_id"
  | "claimer_id",
  string | string | string | string | number | number | Date | string | string
>;

const router = Router();

//Select all pins

router.get("/api/pins", async (req, res) => {
  try {
    const pins = await client.query("getPins");
    res.json(pins);
  } catch (err) {
    console.log("API/pins error:", err);
    res.status(500).send();
  }
});

//Select individual pins

router.get("/api/pins/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const pins = await client.query("getPins");
    const pin = pins.find((p: Pin) => id === p._id.toString());
    res.json(pin);
  } catch (err) {
    console.log("API/pins error:", err);
    res.status(500).send();
  }
});

// //Delete individual pins

router.delete("/api/pins/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const pins = await client.query("getPins");
    const pinFound = pins.find((p: Pin) => id === p._id.toString());
    if (!pinFound) {
      res.send(`The record with id ${id} doesn't exist`);
      return;
    }
    client.mutation("deletePin", { id: pinFound._id });
    res.send(`The record with id ${id} has been deleted`);
  } catch (err) {
    console.log("API/pins error:", err);
    res.status(500).send();
  }
});

// //Update individual pins

router.put("/api/pins/:id", async (req, res) => {
  try {
    const { userID, pinID, updateObject } = req.body;
    //     await queries.updateIndividualPins(db, userID, pinID).then((response) => {
    //       res.json(response.rows);
    const id = req.params.id;
    const pins = await client.query("getPins");
    const pinFound = pins.find((p: Pin) => id === p._id.toString());
    if (!pinFound) {
      res.send(`The record with id ${id} doesn't exist`);
      return;
    }
    client.mutation("updatePin", { id: pinFound._id, tag: updateObject });
    res.send(`The record with id ${id} has been updated`);
  } catch (err) {
    console.error(err);
  }
});

router.post("/api/pins/", async (req, res) => {
  try {
    const {
      title,
      description,
      picture,
      condition,
      latitude,
      longitude,
      date,
      creator_id,
      claimer_id,
    } = req.body;
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
  } catch (err) {
    console.error(err);
  }
});

export default router;
