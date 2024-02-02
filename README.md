# Job Portal Project (Easily)

[Demo]()

This is a job portal website developed using Node.js and Express.js. The project allows recruiters to post and manage job listings and provides a user-friendly platform for job seekers to find and apply for suitable roles.

## Table of Contents

- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [File Descriptions](#file-descriptions)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Overview

The Job Portal Project aims to create a platform where recruiters can post job listings and manage applicants, while job seekers can browse job listings and apply for positions. The project follows an MVC architecture using Express.js for server-side routing and EJS for server-side templating.

## Folder Structure

The project follows a structured folder organization:

- Easily/
  - |- views/ # Contains EJS templates for rendering views
  - |- controllers/ # Controllers handling business logic
  - |- models/ # Models defining data structures and operations
  - |- middleware/ # Middleware functions for request processing
  - |- routes/ # Express routes for defining API endpoints
  - |- public/ # Contains static assets like CSS and JavaScript files
  - |- index.js # Main entry point of the application

## File Descriptions

- **views/**: Contains EJS templates for rendering different views of the application.

  - `layout.ejs`: Common layout view including header, main content, and footer.
  - `home.ejs`: Landing page with a brief overview of the job portal.
  - `login.ejs`, `register.ejs`: Views for user authentication and registration.
  - `jobs.ejs`: Page displaying all available job postings.
  - `job-details.ejs`: Detailed information about a specific job.
  - `addJob.ejs`: For adding new job to portal.
  - `jobApplicants.ejs`: List of applicant applied for a specific job.
  - `update-job.ejs`: For updating a specific job details.
  - `page-404.ejs`: Error handling page.

- **controllers/**: Contains controller files responsible for handling business logic.

  - `user.controller.js`: Handles user authentication and registration.
  - `job.controller.js`: Manages job listings and applicants.

- **models/**: Defines data structures and operations.

  - `user.model.js`: Handles user-related data operations.
  - `job.model.js`: Manages job listings and applicants data.

- **middleware/**: Contains middleware functions for request processing.

  - `auth.middleware.js`: Middleware for user authentication.
  - `lastVisit.middleware.js`: Middleware for storing last visit data in cookies.
  - `upload.files.middleware.js`: Middleware for handling file uploads.
  - `user.middleware.js`: Middleware for user data validation.
  - `validation.middleware.js`: Middleware for job data validation.

- **routes/**: Defines Express routes for API endpoints.

  - `userRoutes.js`: Routes for user authentication and registration.
  - `jobRoutes.js`: Routes for job listings and applicants.

- **public/**: Contains static assets like CSS and JavaScript files used in the frontend.

- **index.js**: Main entry point of the application where server setup and configuration occur.

## Setup and Installation

To run the project locally, follow these steps:

1. Clone the repository: `git clone `
2. Install dependencies: `npm install`
3. Configure environment variables if necessary.
4. Start the server: `node index.js`
5. Visit `http://localhost:3000` in your browser to access the application.

## Usage

Once the server is running, users can access the job portal through the provided routes and views. Recruiters can create, update, delete and manage job postings, while job seekers can browse job listings, apply for positions and search for job by using search box. once the applicant is applied for job successfully, they will receive the conformation mail on there mail id.

## Contributing

Contributions to the project are welcome! Feel free to open issues or submit pull requests to help improve the project.
I hope this README content is helpful!😊
