import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.route.js";
import contactRoutes from "./routes/contact.route.js";  

dotenv.config();
const app = express();

app.use(cookieParser()); // Enables reading cookies from requests
app.use(cors({
  origin: 'https://nancybosiboricv.vercel.app', // React frontend URL
  credentials: true                // Allow cookies to be sent with requests
}));

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/contacts", contactRoutes);  

// Health check route for Render uptime monitoring
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});