import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";
import jobRoutes from "./src/routes/jobRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();

app.use(express.static("src/views"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(expressEjsLayouts);

// set up session middleware
app.use(
  session({
    secret: "SecrectKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// error handler setup
app.use((err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  res.status(statusCode).json({ error: message });
});

// Mount routes
app.use("/", jobRoutes);
app.use("/", userRoutes);

app.listen(3000, () => {
  console.log("server is listening on: http://localhost:3000/");
});
