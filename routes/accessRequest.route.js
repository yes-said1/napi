import express from "express";
import {
  createRequest,
  checkStatus,
  approveRequest,
  getAllRequests,
} from "../controllers/accessRequest.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// User submits request
router.post("/request-access", createRequest);

// User checks request status
router.get("/request-access/status/:id", checkStatus);

// Admin approves request
router.put("/request-access/approve/:id", approveRequest);

// 🔥 Admin get all requests
router.get("/request-access/all", verifyAdmin, getAllRequests);

export default router;
