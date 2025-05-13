const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routeRoutes = require("./routes/routeRoutes");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// CORS setup
const allowedOrigins = [
    "http://localhost:3000",
    "https://opti-route-naija.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow Postman, curl, and direct server-to-server calls
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));

// Middleware
app.use(express.json());

// API routes
app.use("/api/routes", routeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
