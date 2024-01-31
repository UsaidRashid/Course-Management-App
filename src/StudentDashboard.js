import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markCourseAsCompleted } from '../src/redux/actions';

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const prefixes = ['Principles of', 'Introduction to', 'Fundamentals of', 'Applied', 'Advanced'];
const topics = ['Machine Learning', 'JavaScript', 'Back-end Development', 'UX/UI Design', 'JavaScript', 'Artificial Intelligence', 'Internet of Things (IoT)', 'UX/UI Design', 'Internet of Things (IoT)', 'Cybersecurity', 'Mobile App Development', 'Big Data', 'Artificial Intelligence', 'Game Development', 'React', 'Big Data', 'Databases', 'Cybersecurity', 'Blockchain', 'Cloud Computing', 'UX/UI Design', 'Game Development', 'Data Science', 'Front-end Development'];

const getRandomDueDate = () => {
  const currentDate = new Date();
  const randomDays = Math.floor(Math.random() * 30);
  const dueDate = new Date(currentDate.getTime() + randomDays * 24 * 60 * 60 * 1000);
  return dueDate.toDateString();
};

const getRandomInstructor = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return `${data.results[0].name.first} ${data.results[0].name.last}`;
  } catch (error) {
    console.error('Error fetching instructor:', error);
    return 'Unknown Instructor';
  }
};

const StudentDashboard = () => {
  const [randomInstructors, setRandomInstructors] = useState([]);
  const enrolledCourses = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRandomInstructors = async () => {
      const instructors = await Promise.all(Array(enrolledCourses.length).fill(null).map(getRandomInstructor));
      setRandomInstructors(instructors);
    };

    fetchRandomInstructors();
  }, [enrolledCourses]);

  const handleMarkAsCompleted = (courseId) => {
    dispatch(markCourseAsCompleted(courseId));
  };

  return (
    <div>
      <h2>My Enrolled Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Instructor Name</th>
            <th>Due Date</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.map((course, index) => (
            <tr key={course.id}>
              <td>{`${getRandomElement(prefixes)} ${getRandomElement(topics)}`}</td>
              <td>{randomInstructors[index]}</td>
              <td>{getRandomDueDate()}</td>
              <td>
                <input
                  type="checkbox"
                  checked={course.completed}
                  onChange={() => handleMarkAsCompleted(course.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
