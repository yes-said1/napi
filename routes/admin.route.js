import express from "express";
import { registerAdmin, loginAdmin, getAdminProfile } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", verifyAdmin, getAdminProfile); 

export default router;
