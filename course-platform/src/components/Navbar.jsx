import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import axios from 'axios';
import AddNewCourse from "../Pages/Add-New-Course";

function Navbar({ user, onLogout }) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const hideTimeout = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const handleMouseEnter = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      setCoursesOpen(true);
    }
  }
  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setCoursesOpen(false);
    }, 100);
  }

  const handleLogoutClick = () => {
    onLogout();
    navigate("/"); // redirect to home after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Brand/Logo */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">🎓</span>
            <span className="brand-text">Course Platform</span>
          </Link>
        </div>

        {/* Left side nav links */}
        <div className="nav-left">
          <div
            className="dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/" className="nav-link">
              Courses ▼
            </Link>
            {coursesOpen && (
              <div className="dropdown-menu">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <Link
                      key={course._id}
                      to={`/courses/${course._id}`}
                      className="dropdown-item"
                    >
                      {course.course_name}
                    </Link>
                  ))
                ) : (
                  <span className="dropdown-item">No courses</span>
                )}
              </div>
            )}
          </div>
        </div>


        {/* Right side nav links */}
        <div className="nav-right">
          {!user ? (
            <>
              <Link className="login-btn" to="/login">Login</Link>
              <Link className="signup-btn" to="/signup">Signup</Link>
            </>
          ) : (
            <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
