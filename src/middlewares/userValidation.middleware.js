import { body, validationResult } from "express-validator";

export const userRegistrationValidationMiddleware = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please enter valid mail address"),
    body("password").notEmpty().withMessage("Please enter password"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  let validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res
      .status(401)
      .render("register", { errorMessage: validationErrors.array() });
  }

  next();
};

export const userLoginValidationMiddleware = async (req, res, next) => {
  const rules = [
    body("email").isEmail().withMessage("Please enter valid mail address"),
    body("password").notEmpty().withMessage("Please enter password"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  let validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(401).render("login", {
      errorMessage: validationErrors.array(),
      successMessage: null,
    });
  }

  next();
};
