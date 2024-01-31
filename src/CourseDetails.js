import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const getRandomPrerequisites = (array, count) => {
  const result = [];
  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!result.includes(array[randomIndex])) {
      result.push(array[randomIndex]);
    }
  }
  return result;
};

const CourseDetails = () => {
  const { id } = useParams();
  const courses = useSelector((state) => state.courses);

  const [thumbnail, setThumbnail] = useState(null);
  const [students, setStudents] = useState([]);
  const prerequisites = [
    'Web Development',
    'Machine Learning',
    'Data Science',
    'Artificial Intelligence',
    'Blockchain',
    'Cybersecurity',
    'Mobile App Development',
    'UI/UX Design',
    'Cloud Computing',
    'Digital Marketing',
    'Game Development',
    'Internet of Things (IoT)',
    'Robotics',
    'Augmented Reality (AR)',
    'Virtual Reality (VR)',
    'Big Data',
    'Full Stack Development',
    'Frontend Development',
    'Backend Development',
    'DevOps',
  ];
  const [courseDetails, setCourseDetails] = useState({
    duration: '',
    schedule: '',
    location: '',
    syllabus: [
      { week: 1, topic: 'Introductory Phase', content: 'Overview and introduction to the course.' },
      { week: 2, topic: 'Development Phase', content: 'Hands-on development and coding.' },
      { week: 3, topic: 'Conclusion Phase', content: 'Final thoughts and concluding remarks.' },
    ],
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=6');
        const randomUsers = response.data.results;
        const course = courses.find((c) => c.id === id);

        if (course) {
          setCourseDetails({
            duration: `${Math.floor(Math.random() * 10) + 3} weeks`,
            schedule: Math.random() > 0.5 ? 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM' : 'Mondays and Wednesdays, 7:00 PM - 9:00 PM',
            location: Math.random() > 0.5 ? 'Online' : 'On-site',
            prerequisites: Array.from({ length: 2 }, (_, index) => `Prerequisite ${index + 1}`),
            syllabus: [
              { week: 1, topic: 'Introductory Phase', content: 'Overview and introduction to the course.' },
              { week: 2, topic: 'Development Phase', content: 'Hands-on development and coding.' },
              { week: 3, topic: 'Conclusion Phase', content: 'Final thoughts and concluding remarks.' },
            ],
          });

          const numStudents = Math.floor(Math.random() * 6);
          const studentsData = randomUsers.slice(0, numStudents).map((user) => ({
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
          }));
          setStudents(studentsData);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [id, courses, setCourseDetails]);

  const selectedCourse = courses.find((course) => course.id === id);

  if (!selectedCourse) {
    return <p>Course not found</p>;
  }

  return (
    <div>
      <h2>Course Details</h2>
      <div key={selectedCourse.id}>
        <p>Duration: {Math.floor(Math.random() * 12) + 1} weeks</p>
        <p>Schedule: {Math.random() > 0.5 ? 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM' : 'Mondays and Wednesdays, 7:00 PM - 9:00 PM'}</p>
        <p>Location: {Math.random() > 0.5 ? 'Online' : 'On-site'}</p>
        <p>Prerequisites: {prerequisites.length > 0 ? getRandomPrerequisites(prerequisites, 2).join(', ') : 'Not specified'}</p>
        <h3>Syllabus:</h3>
        {courseDetails.syllabus ? (
          <ul>
            {courseDetails.syllabus.map((week) => (
              <li key={week.week}>{`Week ${week.week} - ${week.topic}: ${week.content}`}</li>
            ))}
          </ul>
        ) : (
          <p>Syllabus not available</p>
        )}
        <h3>Enrolled Students:</h3>
        <ul>
          {students.map((student) => (
            <li key={student.id}>{`${student.name} (${student.email})`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;
