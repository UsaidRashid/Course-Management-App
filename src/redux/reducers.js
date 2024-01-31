import { SET_COURSES, MARK_COURSE_AS_COMPLETED } from './actions';

const initialState = {
  courses: [],
  enrolledCourses: [], 
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };

    case MARK_COURSE_AS_COMPLETED:
      const { courseId } = action.payload;

      const updatedEnrolledCourses = state.enrolledCourses.map((course) =>
        course.id === courseId ? { ...course, completed: true } : course
      );

      return {
        ...state,
        enrolledCourses: updatedEnrolledCourses,
      };

    default:
      return state;
  }
};

export default rootReducer;
