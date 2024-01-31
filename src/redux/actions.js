export const SET_COURSES = 'SET_COURSES';
export const MARK_COURSE_AS_COMPLETED = 'MARK_COURSE_AS_COMPLETED';

export const setCourses = (courses) => ({
  type: SET_COURSES,
  payload: courses,
});

export const markCourseAsCompleted = (courseId) => ({
  type: MARK_COURSE_AS_COMPLETED,
  payload: courseId,
});
