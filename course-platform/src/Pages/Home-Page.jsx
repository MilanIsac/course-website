import React, { useEffect, useState } from "react";
import "../styles/home.css";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";

export default function HomePage() {

  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/courses');
      const data = await res.json();
      setCourses(data);

    } catch (error) {
      console.error('Error fetching courses', error);
    }
  }

  useEffect(() => {
    fetchCourses();

    const interval = setInterval(() => {
      fetchCourses();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>

      {/* <Navbar /> */}
      <header className="home-header">
        <h1>Welcome to Course Platform 🎓</h1>
        <p>Learn, Explore and Upskill with the best courses</p>
      </header>

      <section className="courses-section">
        <h2>Available Courses</h2>
        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
