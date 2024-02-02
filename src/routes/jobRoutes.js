import express from "express";
import JobController from "../controllers/job.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import {
  addJobValidationMiddleware,
  updateJobValidationMiddleware,
} from "../middlewares/validation.middleware.js";
import { uploadFile } from "../middlewares/upload.files.middleware.js";
import { setLastVisit } from "../middlewares/lastVisit.middleware.js";

const router = express.Router();
const jobController = new JobController();

// Get home route
router.get("/", setLastVisit, jobController.getHome);

// Get all jobs route
router.get("/jobs", jobController.getJobs);

// Get job by ID route
router.get("/jobs/:id", jobController.getJobDetails);

// get job applicants route
router.get("/jobs/:id/applicants", auth, jobController.getJobApplicants);

// Crate job route
router.get("/addJob", auth, jobController.getAddJobForm);
router.post(
  "/addJob",
  auth,
  addJobValidationMiddleware,
  jobController.postAddNewJob
);

// update job route
router.get("/update-job/:id", auth, jobController.getJobUpdateView);
router.post(
  "/update-job/:id",
  auth,
  updateJobValidationMiddleware,
  jobController.postJobUpdate
);

// Apply to job route
router.post(
  "/apply/:id",
  uploadFile.single("resumeFile"),
  jobController.postApplyForJob
);

// Delete job route
router.delete("/delete-job/:id", auth, jobController.deleteJob);

// search job route
router.post("/search", jobController.searchResults);

export default router;
