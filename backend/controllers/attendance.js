const Attendance = require("../models/attendance");
const Student = require("../models/student");
const Class = require("../models/class");

module.exports.getStudentAttendance = async (req, res) => {
  let { studentId } = req.params;
  let specificStudent = `students.${studentId}`;

  let studentAttendance = await Attendance.find({
    [specificStudent]: { $exists: true },
  })
    .select("date lecture students")
    .populate("course", "code name")
    .populate("faculty", "name")
    .lean();

  studentAttendance.forEach((entry) => {
    let status = entry.students[studentId];
    entry.status = status;
    delete entry.students;
  });

  res.json({
    attendance: studentAttendance,
  });
};

module.exports.getAttendanceMetadata = async (req, res) => {
  let { studentId } = req.params;
  let specificStudent = `students.${studentId}`;

  let studentAttendance = await Attendance.find({
    [specificStudent]: { $exists: true },
  })
    .populate("course", "name")
    .lean();

  let student = await Student.findById(studentId).populate("class").lean();
  let classId = student.class._id;

  let allCourses = await Class.findById(classId)
    .populate("courseTeaching.courseId courseTeaching.facultyId")
    .lean();

  let courseAttendance = new Map();
  let total = 0;
  let present = 0;

  allCourses.courseTeaching.forEach((obj) => {
    courseAttendance[obj.courseId._id.toString()] = {
      courseName: obj.courseId.name,
      courseId: obj.courseId._id,
      code: obj.courseId.code,
      facultyName: obj.facultyId.name,
      facultyId: obj.facultyId._id,
      present: 0,
      total: 0,
    };
  });
  studentAttendance.forEach((entry) => {
    let status = entry.students[studentId];
    let course = entry.course._id.toString();

    if (courseAttendance[course]) {
      courseAttendance[course].total++;
      total++;
      if (status === "present") {
        courseAttendance[course].present++;
        present++;
      }
    }
  });

  res.json({
    metadata: {
      present: present,
      total: total,
      courses: Array.from(Object.values(courseAttendance)),
    },
  });
};

module.exports.getFacultyAttendence = async (req, res) => {
  let { facultyId } = req.params;

  let allAttendance = await Attendance.find({
    faculty: facultyId,
  })
    .select("date lecture")
    .populate("course", "code name")
    .populate("faculty", "name")
    .lean();

  res.json({
    attendance: allAttendance,
  });
};

module.exports.getChartData = async (req, res) => {
  let { studentId } = req.params;
  let specificStudent = `students.${studentId}`;

  let studentAttendance = await Attendance.find({
    [specificStudent]: { $exists: true },
  })
    .select("date students")
    .sort({ date: 1 })
    .lean();

  let data = [];
  let present = 0;
  let lectures = 0;
  let previousDate = "none";
  let previousData = "undefined";
  studentAttendance.forEach((entry) => {
    let status = entry.students[studentId];
    const formattedDate = entry.date.toISOString().slice(0, 10);

    if (status === "present") present++;
    lectures++;

    if (previousDate !== formattedDate) {
      previousDate = formattedDate;
      if (previousData !== "undefined") {
        data.push({
          x: previousData.formattedDate,
          y: previousData.percent,
        });
      }
    }

    previousData = {};
    previousData.formattedDate = formattedDate;
    previousData.percent = (present / lectures) * 100;
    previousData.percent = previousData.percent.toFixed(2);
  });
  data.push({
    x: previousData.formattedDate,
    y: previousData.percent,
  });
  res.json({
    data: data,
  });
};

module.exports.getAllAttendance = async (req, res) => {
  let studentAttendance = await Attendance.find({})
    .select("date lecture")
    .populate("course", "code name")
    .populate("faculty", "name");

  res.json({
    attendance: studentAttendance,
  });
};

module.exports.createAttendance = async (req, res) => {
  let body = req.body;
  let presentStudents = body.students; // request has only array of present students
  let studentsAttendance = {};
  let allStudents = await Student.find({ class: body.class }).select("_id");

  // setting all class student to absent
  allStudents.forEach((student) => {
    studentsAttendance[String(student._id)] = "absent";
  });

  // setting the present students
  presentStudents.forEach((student) => {
    studentsAttendance[student] = "present";
  });

  // replacing the body students with new structure
  body.students = studentsAttendance;

  /*
    changing stucture - 

    from

    attendance: {
      ...
      students: [
        "id",
        "id",
        "id"
      ]
      ...
    }

    to

    attendance: {
      ...
      students: {
        1314134134: "present" or "absent",
        id: ...,
        id: ...
      } 
      ...
    }
  */

  let attendance = new Attendance(body);
  let saved = await attendance.save();
  await attendance.populate([
    { path: "course", select: "code name" },
    { path: "class", select: "branch" },
  ]);
  attendance.count = body.students.length;
  res.json({
    message: `Attendance Added`,
    data: saved,
  });
};
