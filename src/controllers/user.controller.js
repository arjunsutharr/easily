import UserModel from "../models/user.model.js";

export default class UserController {
  getRegisterView(req, res) {
    const { userEmail } = req.session;
    res.status(200).render("register", { errorMessage: null, userEmail });
  }

  postRegister(req, res) {
    const userExist = UserModel.addNewUser(req.body);
    const { userEmail } = req.session;
    if (userExist) {
      res.status(409).render("register", {
        errorMessage: [{ msg: "User already exist with this email" }],
        userEmail,
      });
    } else {
      res.status(201).render("login", {
        errorMessage: null,
        successMessage:
          "registration is successful. please continue with login",
        userEmail,
      });
    }
  }

  getLoginView(req, res) {
    const { userEmail } = req.session;
    res.status(200).render("login", {
      errorMessage: null,
      successMessage: null,
      userEmail,
    });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const { userEmail } = req.session;
    const isValidUser = UserModel.userCredentialsValidation(req.body);

    if (isValidUser) {
      req.session.userEmail = email;
      res.status(200).redirect("jobs");
    } else {
      res.status(401).render("login", {
        errorMessage: [{ msg: "invalid email or password" }],
        successMessage: null,
        userEmail,
      });
    }
  }

  postLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send("Error while destroying session:", err);
      } else {
        res.status(200).render("home", { userEmail: null });
      }
    });

    res.clearCookie("lastVisit");
  }
}
