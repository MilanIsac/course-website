import React from "react";
import "../styles/home.css";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";

export default function HomePage() {
  // Dummy data for courses
  const courses = [
    { id: 1, title: "React Basics", description: "Learn the fundamentals of React.js", image: "https://via.placeholder.com/250" },
    { id: 2, title: "Node.js Crash Course", description: "Build backend APIs with Node.js and Express", image: "https://via.placeholder.com/250" },
    { id: 3, title: "MongoDB Essentials", description: "Understand NoSQL with MongoDB", image: "https://via.placeholder.com/250" },
  ];

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
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </section>
    </div>
  );
}
