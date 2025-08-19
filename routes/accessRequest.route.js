import express from "express";
import {
  createRequest,
  checkStatus,
  approveRequest,
} from "../controllers/accessRequest.controller.js";

const router = express.Router();

// User submits request
router.post("/request-access", createRequest);

// User checks request status
router.get("/request-access/status/:id", checkStatus);

// Admin approves request
router.put("/request-access/approve/:id", approveRequest);

export default router;
