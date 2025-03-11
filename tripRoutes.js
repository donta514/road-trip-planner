const express = require("express");
const { Pool } = require("pg");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Create a Trip
router.post("/", verifyToken, async (req, res) => {
  const { name, start_location, end_location, trip_date } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "INSERT INTO trips (user_id, name, start_location, end_location, trip_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, name, start_location, end_location, trip_date]
    );
    res.status(201).json({ trip: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating trip" });
  }
});

// Get All Trips (User)
router.get("/", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query("SELECT * FROM trips WHERE user_id = $1", [
      userId,
    ]);
    res.json({ trips: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching trips" });
  }
});

// Get a Single Trip
router.get("/:trip_id", verifyToken, async (req, res) => {
  const { trip_id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM trips WHERE id = $1 AND user_id = $2",
      [trip_id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Trip not found" });
    }
    res.json({ trip: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching trip" });
  }
});

// Update a Trip
router.put("/:trip_id", verifyToken, async (req, res) => {
  const { trip_id } = req.params;
  const { name, start_location, end_location, trip_date } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "UPDATE trips SET name = $1, start_location = $2, end_location = $3, trip_date = $4 WHERE id = $5 AND user_id = $6 RETURNING *",
      [name, start_location, end_location, trip_date, trip_id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Trip not found" });
    }
    res.json({ trip: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating trip" });
  }
});

// Delete a Trip
router.delete("/:trip_id", verifyToken, async (req, res) => {
  const { trip_id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "DELETE FROM trips WHERE id = $1 AND user_id = $2 RETURNING *",
      [trip_id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Trip not found" });
    }
    res.json({ msg: "Trip deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error deleting trip" });
  }
});

module.exports = router;
