import React from "react";
import "../styles/course-card.css";

function CourseCard({ content }) {
  if (!content) return null;


  const getYoutubeThumbnail = (url) => {
    try {
      const id = new URL(url).searchParams.get('v');
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    } catch (err) {
      return "";
    }
  }

  const thumbnail = content.video_link ? getYoutubeThumbnail(content.video_link) : "";

  return (
    <div className="content-card">
      <div className="content-header">

        <img src={thumbnail} alt="Course Thumbnail" className="video-thumbnail"/>
        
        <h3 className="content-title">
          Course Name: 
          {content.course_id?.course_name || "Untitled Course"}
        </h3>
        <p className="content-category">Description: {content.title}</p>
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
