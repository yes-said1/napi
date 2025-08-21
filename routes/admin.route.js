import express from "express";
import { registerAdmin, loginAdmin, getAdminProfile, logoutAdmin } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin); 
router.get("/profile", verifyAdmin, getAdminProfile); 

export default router;
