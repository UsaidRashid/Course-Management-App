import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCourses } from './redux/actions';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseListing = () => {
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const courseDescriptions = [
    'Learn the fundamentals of this exciting subject and build a strong foundation for advanced topics.',
    'Explore the practical applications of the theoretical concepts taught in this course.',
    'Dive deep into hands-on projects to enhance your skills and gain real-world experience.',
    'Discover the latest trends and advancements in the field, guided by industry experts.',
    'Collaborate with peers on group projects to simulate a professional work environment.',
    'Master the art of problem-solving and critical thinking through challenging exercises.',
    'Prepare for a successful career with insights into industry best practices and strategies.',
    'Get inspired by real-world success stories and learn from the journeys of accomplished professionals.',
  ];

  const generateCourseName = (index) => {
    const prefixes = ['Introduction to', 'Advanced', 'Fundamentals of', 'Applied', 'Principles of'];
    const topics = [
      'React', 'JavaScript', 'Machine Learning', 'Data Science', 'Web Development',
      'Artificial Intelligence', 'Python', 'Front-end Development', 'Back-end Development',
      'Mobile App Development', 'Cybersecurity', 'Blockchain', 'Cloud Computing',
      'UX/UI Design', 'Game Development', 'Internet of Things (IoT)', 'DevOps',
      'Big Data', 'Databases'
    ];

    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    return `${randomPrefix} ${randomTopic}`;
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/', {
          params: {
            results: 100,
          },
        });

        const data = response.data.results.map((user, index) => ({
          id: user.login.uuid,
          ind: index + 1,
          name: generateCourseName(index + 1),
          instructor: `${user.name.first} ${user.name.last}`,
          description: courseDescriptions[Math.floor(Math.random() * courseDescriptions.length)],
          enrollmentStatus: Math.random() > 0.5 ? 'Open' : 'Closed',
        }));

        dispatch(setCourses(data));
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [dispatch]);

  return (
    <div>
      <nav>
        <Link to="/student-dashboard">Student Dashboard</Link>
      </nav>
      {courses.map((course) => (
        <div key={course.ind}>
          <h3>Course ID: {course.ind}</h3>
          <p>Name: {course.name}</p>
          <p>Instructor: {course.instructor}</p>
          <p>Description: {course.description}</p>
          <p>Enrollment Status: {course.enrollmentStatus}</p>
          <Link to={`/course-details/${course.id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CourseListing;
