import { body, validationResult } from "express-validator";
import JobModel from "../models/job.model.js";
import {
  jobCategories,
  jobDesignations,
  jobSkills,
} from "../models/job.model.js";

export const addJobValidationMiddleware = async (req, res, next) => {
  const rules = [
    body("jobDesignation").custom((value, { req }) => {
      if (value.trim() == "Select job designation") {
        throw new Error("Please select job designation");
      }
      return true;
    }),
    body("jobLocation").notEmpty().withMessage("Job location is required"),
    body("companyName").notEmpty().withMessage("Company name is required"),
    body("numberOfOpenings")
      .notEmpty()
      .withMessage("Total positions must be positive number"),
    body("skills").custom((value, { req }) => {
      if (!value) {
        throw new Error("Atleast one skill is requied");
      }
      return true;
    }),
    body("applyBy").notEmpty().withMessage("Date is required"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  let validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(401).render("addJob", {
      errorMessage: validationErrors.array(),
      jobCategories,
      jobDesignations,
      jobSkills,
    });
  }

  next();
};

export const updateJobValidationMiddleware = async (req, res, next) => {
  const jobId = req.params.id;
  const selectedJob = JobModel.getJobById(jobId);

  const rules = [
    body("jobDesignation").custom((value, { req }) => {
      if (value.trim() == "Select job designation") {
        throw new Error("Please select job designation");
      }
      return true;
    }),
    body("jobLocation").notEmpty().withMessage("Job location is required"),
    body("companyName").notEmpty().withMessage("Company name is required"),
    body("numberOfOpenings")
      .notEmpty()
      .withMessage("Total positions must be positive number"),
    body("skills").custom((value, { req }) => {
      if (!value) {
        throw new Error("Atleast one skill is requied");
      }
      return true;
    }),
    body("applyBy").notEmpty().withMessage("Date is required"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  let validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(401).render("update-job", {
      errorMessage: validationErrors.array(),
      jobCategories,
      jobDesignations,
      jobSkills,
      job: selectedJob,
    });
  }

  next();
};
