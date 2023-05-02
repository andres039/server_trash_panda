import { Router } from "express";

require("dotenv").config({ path: ".env.local" });

const { ConvexHttpClient } = require("convex/browser");
// const jwt = require("jsonwebtoken");
// const { Pool } = require("pg");
// const dbParams = require("../lib/db.js");
// const db = new Pool(dbParams);
// const queries = require("./dbQueries/pinQueries");
// db.connect();
const client = new ConvexHttpClient(process.env["CONVEX_URL"]);

// const pins = [
//   {
//     title: "Bizantine chair",
//     description:
//       "This nice chair made from silk has only been used for a few month. It has soft cushions for maximum comfort.",
//     picture:
//       "https://i.pinimg.com/originals/d9/8c/98/d98c9835981b8eb41968f62185559f8b.jpg",
//     condition: "Like new",
//     latitude: 45.5017,
//     longitude: -73.5673,
//     date: "2022-01-25",
//     creator_id: 5,
//     claimer_id: null,
//   },
// ];
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

// router.get("/api/pins/:id", (req, res) => {
//   queries
//     .getPinsById(db, req.params.id)
//     .then((response) => res.send(response.rows))
//     .catch((err) => {
//       console.log("API/pins error:", err);
//       res.status(500).send();
//     });
// });

// //Delete individual pins

// router.delete("/api/pins/:id", (req, res) => {
//   queries
//     .deletePins(db, req.params.id)
//     .then(() => {
//       res.send(200);
//     })
//     .catch((err) => {
//       console.log("API/pins error:", err);
//       res.status(500).send();
//     });
// });

// //Update individual pins

// router.put("/api/pins/:id", async (req, res) => {
//   try {
//     const { userID, pinID } = req.body;
//     await queries.updateIndividualPins(db, userID, pinID).then((response) => {
//       res.json(response.rows);
//     });
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// router.post("/api/pins", async (req, res) => {
//   try {
//     //test compare with users

//     jwt.verify(req.headers.token, process.env.TOKEN_KEY);
//     const {
//       title,
//       description,
//       picture,
//       condition,
//       latitude,
//       longitude,
//       date,
//       creator_id,
//       claimer_id,
//     } = req.body;

//     const newPin = await queries.insertNewPin(
//       db,
//       title,
//       description,
//       picture,
//       condition,
//       latitude,
//       longitude,
//       date,
//       creator_id,
//       claimer_id
//     );
//     res.json(newPin);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

export default router;
