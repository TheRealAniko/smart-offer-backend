import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// 1. Load environment variables from .env file
dotenv.config();

// 2. Create an Express application
const app = express();
app.use(cors());
app.use(express.json());

// 3. Port from environment variables or default to 4000
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// 4. Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

// 5. Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
