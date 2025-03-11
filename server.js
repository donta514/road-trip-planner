const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const authRouter = require("./routes/authRoutes");
const tripRouter = require("./routes/tripRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routes
app.use("/api/auth", authRouter);
app.use("/api/trips", tripRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
