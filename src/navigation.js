import { history } from './history'; 

export const navigateToCourseDetails = (courseId) => {
  console.log(`Navigating to course details for courseId: ${courseId}`);
  history.push(`/course-details/${courseId}`);
};
