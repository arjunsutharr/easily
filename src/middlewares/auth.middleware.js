// This middleware function checks if the user is authenticated
// and redirects them to the login page if they are not.

export const auth = (req, res, next) => {
  if (req.session.userEmail) {
    next();
  } else {
    res.redirect("/login");
  }
};
