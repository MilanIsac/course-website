import React from "react";
import "../styles/course-card.css";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  if (!course) return null;

  return (
    <div className="course-card">
      <div className="course-header">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-category">{course.desc}</p>
        <a className="video-link" href={course.video_link} target="_blank" rel="noopener noreferrer">Video Link</a>
      </div>
    </div>
  );
}

export default CourseCard;