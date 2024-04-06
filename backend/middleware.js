const jwt = require("jsonwebtoken");

module.exports.studentAuthorization = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Student ")) {
    return res.status(403).json({
      message: "not Authenticated",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.studentId = decoded.studentId;

    next();
  } catch (err) {
    return res.status(403).json({
      message: "some error here : " + err,
    });
  }
};

module.exports.facultyAuthorization = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Faculty ")) {
    return res.status(403).json({
      message: "not Authenticated",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.facultyId = decoded.facultyId;

    next();
  } catch (err) {
    return res.status(403).json({
      message: "some error here : " + err,
    });
  }
};
