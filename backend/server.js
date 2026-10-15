const express = require("express");
const cors = require("cors");
require("dotenv").config();

const constructionRoutes = require("./routes/constructionRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-production-6c8e.up.railway.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Construction Project Manager API is running"
  });
});

app.use("/api", constructionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});