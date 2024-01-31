import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseListing from './CourseListing';
import CourseDetails from './CourseDetails';
import StudentDashboard from './StudentDashboard';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<CourseListing />} />
          <Route path="/course-details/:id" element={<CourseDetails />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
