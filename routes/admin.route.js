import express from "express";
import { registerAdmin, loginAdmin, getAdminProfile, logoutAdmin } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin); 

// Get admin profile (protected)
router.get("/profile", verifyAdmin, getAdminProfile);

// Auth check route (for ProtectedRoute)
router.get("/check-auth", verifyAdmin, (req, res) => {
  res.json({ success: true, message: "Authenticated", admin: req.admin });
});

export default router;
