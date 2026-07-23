import express from "express";
import {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get All Jobs
router.get("/", protect, getJobs);

// Add Job
router.post("/", protect, addJob);

// Update Job
router.put("/:id", protect, updateJob);

// Delete Job
router.delete("/:id", protect, deleteJob);

export default router;