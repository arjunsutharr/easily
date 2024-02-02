import nodemailer from "nodemailer";
export default class JobModel {
  constructor(
    recruiterMail,
    id,
    jobCategory,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    numberOfOpenings = 0,
    skillsRequired = [],
    applyBy,
    applicants = [],
    jobPosted = new Date().toISOString()
  ) {
    this.recruiterMail = recruiterMail;
    this.id = id;
    this.jobCategory = jobCategory;
    this.jobDesignation = jobDesignation;
    this.jobLocation = jobLocation;
    this.companyName = companyName;
    this.salary = salary;
    this.numberOfOpenings = numberOfOpenings;
    this.skillsRequired = Array.isArray(skillsRequired)
      ? skillsRequired
      : [skillsRequired];
    this.applyBy = applyBy;
    this.applicants = applicants;
    this.jobPosted = jobPosted;
  }

  // Add a new job
  static addJob(jobData, userEmail) {
    const {
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      numberOfOpenings,
      skills,
      applyBy,
    } = jobData;

    const jobPosted = this.dateFormate(new Date().toISOString());

    let jobApplicantis = [];

    const newJob = new JobModel(
      userEmail,
      jobs.length + 1,
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      numberOfOpenings,
      skills,
      applyBy,
      jobApplicantis,
      jobPosted
    );

    jobs.push(newJob);
    return newJob;
  }

  // date formated
  static dateFormate(dateString) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(5, 7);
    const day = dateString.substring(8, 10);
    return `${day}/${month}/${year}`;
  }

  // Get all jobs
  static getJob() {
    return jobs;
  }

  // Get a job by ID
  static getJobById(id) {
    return jobs.find((job) => job.id == id);
  }

  // Remove a job by ID
  static removeJob(jobId) {
    const jobIndex = jobs.findIndex((job) => job.id == jobId);
    try {
      jobs.splice(jobIndex, 1);
      return true;
    } catch (error) {
      console.error("error removing the job", error);
      return false;
    }
  }

  // Add applicant to a job
  static addApplicant(jobId, applicantData, resumeFile) {
    const { name, email, number } = applicantData;
    const selectedJob = this.getJobById(jobId);

    const applicantDetails = {
      applicantId: selectedJob.applicants.length + 1,
      name: name,
      email: email,
      contact: number,
      resume: resumeFile,
    };

    try {
      selectedJob.applicants.push(applicantDetails);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get applicants for a job by ID
  static jobApplicantis(jobId) {
    return this.getJobById(jobId)?.applicants ?? [];
  }

  static sendUserMail(jobId, userData) {
    const { name, email } = userData;
    const selectedJob = this.getJobById(jobId);
    const { companyName } = selectedJob;
    sendMail(name, email, companyName);
  }

  // update job details
  static updateJob(jobId, jobData) {
    const {
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      numberOfOpenings,
      skills,
      applyBy,
      jobPosted,
    } = jobData;
    const jobIndex = jobs.findIndex((job) => job.id == jobId);
    const jobApplicants = jobs[jobIndex].applicants;
    const recruiterMail = jobs[jobIndex].recruiterMail;

    const updateJobData = new JobModel(
      recruiterMail,
      jobId,
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      numberOfOpenings,
      skills,
      applyBy,
      jobApplicants,
      jobPosted
    );

    try {
      jobs[jobIndex] = updateJobData;
      return true;
    } catch (error) {
      console.error("error updating the product", error);
      return false;
    }
  }

  // search job
  static searchJobs(searchTerm) {
    console.log(searchTerm);
    const searchProperties = [
      "jobCategory",
      "jobDesignation",
      "jobLocation",
      "companyName",
    ];

    const regex = new RegExp(searchTerm, "i");
    return jobs.filter((job) => {
      return searchProperties.some((prop) => job[prop].match(regex));
    });
  }
}

// once successfully applied for job, send mail to applicants
async function sendMail(userName, userEmail, companyName) {
  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arjunasuthar70@gmail.com",
      pass: "fupidodqhjddvakv",
    },
  });

  const mailOptions = {
    from: "arjunasuthar70@gmail.com",
    to: `${userEmail}`,
    subject: "Job Application Confirmation",
    text: `
Dear ${userName},

Thank you for applying to a job at ${companyName}. We have received your application and are currently reviewing it.

If your qualifications match our requirements, we will contact you for the next steps of the selection process.

Thank you for your interest in joining our team!

Best regards,

The ${companyName} Team
    `,
  };

  try {
    const result = await transpoter.sendMail(mailOptions);
  } catch (error) {
    console.error("Mail send failed with error:" + error);
  }
}

// job skills array
export let jobSkills = [
  "React",
  "NodeJs",
  "Postman",
  "Express",
  "Angular",
  "Video Editor",
];

// job categories array
export let jobCategories = ["Tech", "Non Tech"];

// job designation array
export let jobDesignations = [
  "HR",
  "SDE",
  "DevOps",
  "Web Developer",
  "MERN Developer",
  "JAVA Developer",
  "Front-End Developer",
  "Back-End Developer",
  "Full-Stack Developer",
];

// job array with dummy data
let jobs = [
  new JobModel(
    "aiiwi@gmail.com",
    "1",
    "Tech",
    "Web Developer",
    "jodhpur",
    "Yogi Tech limited",
    "33LPA",
    11,
    ["React", "NodeJs", "Postman", "Express"],
    "11feb2024",
    [
      {
        applicantId: 1,
        name: "Harish",
        email: "harish@gmail.com",
        contact: 7070707070,
        resume: "/resumes/1706541654385-c4f790612ad93f8e44810aa5b3c3b1d6.pdf",
      },
    ],
    "02/02/2024"
  ),
  new JobModel(
    "arju@gmail.com",
    "2",
    "Non Tech",
    "Video Editor",
    "Ahmedabad",
    "Grace Technologies",
    "33LPA",
    11,
    ["React", "NodeJS"],
    "11Nov",
    [
      {
        applicantId: 1,
        name: "vigensh",
        email: "harish@gmail.com",
        contact: 7070707070,
        resume: "/resumes/c4f790612ad93f8e44810aa5b3c3b1d6.pdf",
      },
    ],
    "05/02/2024"
  ),
  new JobModel(
    "arjun@gmail.com",
    "3",
    "Tech",
    "Full-Stack Developer",
    "remote",
    "Yogini Technologies",
    "33LPA",
    11,
    ["Postman", "Express"],
    "11Dec",
    [
      {
        applicantId: 1,
        name: "madhav",
        email: "madhav@gmail.com",
        contact: 7070707070,
        resume: "/resumes/c4f790612ad93f8e44810aa5b3c3b1d6.pdf",
      },
    ],
    "02/01/2024"
  ),
];
