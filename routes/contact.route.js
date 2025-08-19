import express from "express";
import {
  createContact,
  getContacts,
  getContactById,
  deleteContact,
} from "../controllers/contact.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public - anyone can send a message
router.post("/create", createContact);

// Protected - only admins can access
router.get("/", verifyAdmin, getContacts);
router.get("/:id", verifyAdmin, getContactById);
router.delete("/:id", verifyAdmin, deleteContact);

export default router;
