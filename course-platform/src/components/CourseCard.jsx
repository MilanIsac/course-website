import React from "react";
import "../styles/course-card.css";

function CourseCard({ course }) {
  if (!course) return null; // don't render anything if course is undefined

  return (
    <div className="course-card">
      <div className="course-header">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-category">{course.category}</p>
      </div>

      <p className="course-instructor"><strong>Instructor:</strong> {course.instructor}</p>
      <p className="course-exam"><strong>Exam:</strong> {course.exam}</p>

      <div className="course-video">
        <iframe
          width="100%"
          height="200"
          src={course.youtubeUrl}
          title={course.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}


export default CourseCard;
