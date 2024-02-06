const courseData = [
  {
    code: "SESH1070",
    name: "Fundamentals of Mathematics",
    teachingScheme: {
      theory: 2,
      practical: 0,
      tutorial: 2,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 0,
        ese: 0,
      },
      tutorial: {
        ce: 50,
        ese: 0,
      },
    },
    credit: 4,
  },
  {
    code: "SECV1040",
    name: "Basics of Civil & Mechanical Engineering",
    teachingScheme: {
      theory: 4,
      practical: 2,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 20,
        ese: 30,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 5,
  },
  {
    code: "SECE1050",
    name: "Programming for Problem Solving",
    teachingScheme: {
      theory: 3,
      practical: 4,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 40,
        ese: 60,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 5,
  },
  {
    code: "SESH1240",
    name: "Electrical& Electronics Workshop",
    teachingScheme: {
      theory: 0,
      practical: 2,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 0,
        ese: 0,
      },
      practical: {
        ce: 50,
        ese: 0,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 1,
  },
  {
    code: "SEHV1010",
    name: "Universal Human Values-I",
    teachingScheme: {
      theory: 2,
      practical: 0,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 100,
        ese: 0,
      },
      practical: {
        ce: 0,
        ese: 0,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
  },
  {
    code: "SESH1080",
    name: "Linear Algebra & Calculus",
    teachingScheme: {
      theory: 3,
      practical: 0,
      tutorial: 2,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 0,
        ese: 0,
      },
      tutorial: {
        ce: 50,
        ese: 0,
      },
    },
    credit: 5,
  },
  {
    code: "SEIT1030",
    name: "Object Oriented Programming with Java",
    teachingScheme: {
      theory: 3,
      practical: 4,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 40,
        ese: 60,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 5,
  },
  {
    code: "SEIT1010",
    name: "Introduction to Web Designing",
    teachingScheme: {
      theory: 0,
      practical: 2,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 0,
        ese: 0,
      },
      practical: {
        ce: 50,
        ese: 0,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 1,
  },
  {
    code: "SEME1020",
    name: "Engineering Workshop",
    teachingScheme: {
      theory: 0,
      practical: 2,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 0,
        ese: 0,
      },
      practical: {
        ce: 50,
        ese: 0,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 1,
  },
  {
    code: "SEME1040",
    name: "Concepts of Engineering Drawing",
    teachingScheme: {
      theory: 2,
      practical: 2,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 20,
        ese: 30,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 3,
  },
  {
    code: "SESH1210",
    name: "Applied Physics",
    teachingScheme: {
      theory: 3,
      practical: 2,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 20,
        ese: 30,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 4,
  },
  {
    code: "CFLS1010",
    name: "Linguistic Proficiency",
    teachingScheme: {
      theory: 2,
      practical: 0,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 0,
        ese: 0,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 2,
  },
  {
    code: "SESH2040",
    name: "Discrete Mathematics",
    teachingScheme: {
      theory: 3,
      practical: 0,
      tutorial: 2,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 0,
        ese: 0,
      },
      tutorial: {
        ce: 50,
        ese: 0,
      },
    },
    credit: 5,
  },
  {
    code: "SECE2111",
    name: "Database Management System",
    teachingScheme: {
      theory: 3,
      practical: 2,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 20,
        ese: 30,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 4,
  },
  {
    code: "SECE2021",
    name: "Digital Workshop",
    teachingScheme: {
      theory: 0,
      practical: 2,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 0,
        ese: 0,
      },
      practical: {
        ce: 20,
        ese: 30,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 2,
  },
  {
    code: "SECE2031",
    name: "Data Structures",
    teachingScheme: {
      theory: 3,
      practical: 2,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 20,
        ese: 30,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 4,
  },
  {
    code: "SECE2120",
    name: "Programming with Python",
    teachingScheme: {
      theory: 3,
      practical: 2,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 20,
        ese: 30,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 4,
  },
  {
    code: "SEIT2041",
    name: "Mobile Application Development",
    teachingScheme: {
      theory: 2,
      practical: 4,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 40,
        ese: 60,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 4,
  },
  {
    code: "CFLS1020",
    name: "Global Communication Skills",
    teachingScheme: {
      theory: 2,
      practical: 0,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 0,
        ese: 0,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 2,
  },
  {
    code: "SECE2910",
    name: "Industrial Exposure",
    teachingScheme: {
      theory: 0,
      practical: 0,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 0,
        ese: 0,
      },
      practical: {
        ce: 100,
        ese: 0,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 2,
  },
  {
    code: "SESH2051",
    name: "Mathematical Methods for Computation",
    teachingScheme: {
      theory: 3,
      practical: 0,
      tutorial: 2,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 0,
        ese: 0,
      },
      tutorial: {
        ce: 50,
        ese: 0,
      },
    },
    credit: 5,
  },
  {
    code: "SECE2040",
    name: "Computer Organization",
    teachingScheme: {
      theory: 3,
      practical: 2,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 20,
        ese: 30,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 4,
  },
  {
    code: "SECE3011",
    name: "Computer Network",
    teachingScheme: {
      theory: 3,
      practical: 2,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 20,
        ese: 30,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 4,
  },
  {
    code: "SEIT2031",
    name: "Operating System",
    teachingScheme: {
      theory: 3,
      practical: 2,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 20,
        ese: 30,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 4,
  },
  {
    code: "SEIT3010",
    name: "Software Engineering",
    teachingScheme: {
      theory: 3,
      practical: 0,
      tutorial: 1,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 0,
        ese: 0,
      },
      tutorial: {
        ce: 50,
        ese: 0,
      },
    },
    credit: 4,
  },
  {
    code: "CFLS3010",
    name: "Foreign Language-I",
    teachingScheme: {
      theory: 2,
      practical: 0,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 40,
        ese: 60,
      },
      practical: {
        ce: 0,
        ese: 0,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 2,
  },
  {
    code: "SEPD3040",
    name: "Integrated Personality Development Course-I",
    teachingScheme: {
      theory: 2,
      practical: 0,
      tutorial: 0,
    },
    examinationScheme: {
      theory: {
        ce: 100,
        ese: 0,
      },
      practical: {
        ce: 0,
        ese: 0,
      },
      tutorial: {
        ce: 0,
        ese: 0,
      },
    },
    credit: 1,
  },
];
module.exports = courseData;
