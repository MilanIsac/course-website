import React from "react";
import "../styles/course-card.css";

function CourseCard({ content }) {
  if (!content) return null;

  return (
    <div className="content-card">
      <div className="content-header">
        <h3 className="content-title">
          {content.course_id?.course_name || "Untitled Course"}
        </h3>
        <p className="content-category">{content.title}</p>
        {content.video_link ? (
          <a
            className="video-link"
            href={content.video_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Video
          </a>
        ) : (
          <p>No video link available</p>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
