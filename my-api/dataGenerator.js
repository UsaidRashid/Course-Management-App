const falso = require('falso');

const generateCourses = (count) => {
  const courses = [];

  for (let i = 0; i < count; i++) {
    const course = {
      id: i + 1,
      name: falso.name.title(),
      instructor: falso.name.fullName(),
      description: falso.lorem.paragraph(),
      enrollmentStatus: falso.random.arrayElement(['Open', 'Closed']),
    };

    courses.push(course);
  }

  return courses;
};

module.exports = { generateCourses };
