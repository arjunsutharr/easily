import JobModel from "../models/job.model.js";
import {
  jobSkills,
  jobCategories,
  jobDesignations,
} from "../models/job.model.js";

export default class JobController {
  getHome(req, res) {
    const { userEmail } = req.session;
    res.status(200).render("home", { userEmail });
  }

  getAddJobForm(req, res) {
    const { userEmail } = req.session;
    return res.render("addJob", {
      jobSkills,
      jobCategories,
      jobDesignations,
      errorMessage: null,
      userEmail,
    });
  }

  getJobs(req, res) {
    const { userEmail } = req.session;
    const jobs = JobModel.getJob();
    return res.render("jobs", { jobs, userEmail });
  }

  postAddNewJob(req, res) {
    const { userEmail } = req.session;
    const newJob = JobModel.addJob(req.body, userEmail);
    if (newJob) {
      const { id } = newJob;
      res.redirect(`jobs/${id}`);
    } else {
      res.status(500).send("Error while creating new job");
    }
  }

  getJobDetails(req, res) {
    const id = req.params.id;
    const { userEmail } = req.session;
    const selectedJob = JobModel.getJobById(id);
    if (selectedJob) {
      return res.render("job-details", { job: selectedJob, userEmail });
    } else {
      return res.status(404).redirect("page-404");
    }
  }

  getJobUpdateView(req, res) {
    const jobId = req.params.id;
    const { userEmail } = req.session;
    const selectedJob = JobModel.getJobById(jobId);
    if (selectedJob) {
      res.render("update-job", {
        job: selectedJob,
        jobSkills,
        jobCategories,
        jobDesignations,
        errorMessage: null,
        userEmail,
      });
    } else {
      res.status(404).redirect("page-404");
    }
  }

  postApplyForJob(req, res) {
    const jobId = req.params.id;
    const resumeFile = "/resumes/" + req.file.filename;

    const applicantAdded = JobModel.addApplicant(jobId, req.body, resumeFile);
    if (applicantAdded) {
      JobModel.sendUserMail(jobId, req.body);
      res.status(201).redirect(`/jobs/${jobId}`);
    } else {
      res.status(500).send("Error adding applicant");
    }
  }

  getJobApplicants(req, res) {
    const jobId = req.params.id;
    const { userEmail } = req.session;
    const selectedJobApplicants = JobModel.jobApplicantis(jobId);
    if (selectedJobApplicants.length === 0) {
      res.redirect("page-404");
    } else {
      res.render("jobApplicants", {
        jobApplicants: selectedJobApplicants,
        userEmail,
      });
    }
  }

  deleteJob(req, res) {
    const jobId = req.params.id;
    const { userEmail } = req.session;
    const isRemoved = JobModel.removeJob(jobId);

    if (isRemoved) {
      const jobs = JobModel.getJob();
      return res.render("jobs", { jobs, userEmail });
    } else {
      res.status(500).send("Error adding applicant");
    }
  }

  postJobUpdate(req, res) {
    const jobId = req.params.id;
    const updated = JobModel.updateJob(jobId, req.body);

    if (updated) {
      res.redirect(`/jobs/${jobId}`);
    } else {
      res.send("Error updating the product");
    }
  }

  searchResults(req, res) {
    const { searchInput } = req.body;
    const { userEmail } = req.session;
    const jobs = JobModel.searchJobs(searchInput);

    if (jobs.length > 0) {
      return res.render("jobs", { jobs, userEmail });
    } else {
      return res.render("page-404", { userEmail });
    }
  }
}
