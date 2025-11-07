import React, { useEffect, useState } from "react";
import "../styles/home.css";
import CourseCard from "../components/CourseCard";

export default function HomePage() {
  const [contents, setContents] = useState([]);

  const fetchContents = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/content");
      const data = await res.json();
      setContents(data);
    } catch (error) {
      console.error("Error fetching contents", error);
    }
  };

  useEffect(() => {
    fetchContents();

    // Automatically refresh every 5 seconds
    const interval = setInterval(fetchContents, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <header className="home-header">
        <h1>Welcome to Course Platform 🎓</h1>
        <p>Learn, Explore and Upskill with the best courses</p>
      </header>

      <section className="courses-section">
        <h2>Available Videos</h2>
        <div className="courses-grid">
          {contents.map((content) => (
            <CourseCard key={content._id} content={content} />
          ))}
        </div>
      </section>
    </div>
  );
}
