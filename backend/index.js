if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressErrors");
const cors = require("cors");

// allow access of api
app.use(cors());

// routes
const courseRouter = require("./routes/course");
const adminRouter = require("./routes/admin");
const facultyRouter = require("./routes/faculty");
const studentRouter = require("./routes/student");
const classRouter = require("./routes/class");
const attendanceRouter = require("./routes/attendence");
const assignmentRouter = require("./routes/assignment");

// connect to db
let main = async () => {
  mongoose.connect(process.env.MONGO_URL);
};
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("DB Connection Error");
  });

// request body and response format
app.use(express.json());

// All the Routes
app.use("/course", courseRouter);
app.use("/faculty", facultyRouter);
app.use("/class", classRouter);
app.use("/attendance", attendanceRouter);
app.use("/admin", adminRouter);
app.use("/student", studentRouter);
app.use("/assignment", assignmentRouter);

// if request don't match any route
app.get("*", (req, res) => {
  throw new ExpressError(404, "Page not found");
});

// all errors
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({
    message: message,
  });
});

app.listen(port, () => {
  console.log(`Listening to Server: ${port}`);
});
