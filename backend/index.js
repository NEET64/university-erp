if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");

// routes
const adminRouter = require("./routes/admin");
const facultyRouter = require("./routes/faculty");
const studentRouter = require("./routes/student");
const ExpressError = require("./utils/ExpressErrors");

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
app.use("/admin/", adminRouter);
app.use("/faculty/", facultyRouter);
app.use("/student/", studentRouter);

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
