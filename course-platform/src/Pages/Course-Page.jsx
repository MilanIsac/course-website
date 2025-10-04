import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/course-details.css";

export default function CourseDetails() {
  const { id } = useParams();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState({
    title: "",
    desc: "",
    video_link: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch contents
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/content/course/${id}`);
        setContents(res.data);
      } catch (err) {
        console.error("Error fetching contents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContents();
  }, [id]);

  // Add new content
  const handleAddContent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/content",
        {
          course_id: id,
          ...newContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContents((prev) => [...prev, res.data]);
      setNewContent({ title: "", desc: "", video_link: "" });
    } catch (err) {
      console.error("Error adding content:", err);
    }
  };

  // Delete content
  const handleDelete = async (contentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/content/${contentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContents((prev) => prev.filter((c) => c._id !== contentId));
    } catch (err) {
      console.error("Error deleting content:", err);
    }
  };

  // Put content into edit mode
  const handleEdit = (content) => {
    setEditingId(content._id);
    setNewContent({
      title: content.title,
      desc: content.desc,
      video_link: content.video_link,
    });
  };

  // Update content when form is submitted
  const handleUpdateContent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:3000/api/content/${editingId}`,
        { ...newContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContents((prev) =>
        prev.map((c) => (c._id === editingId ? res.data : c))
      );

      setEditingId(null);
      setNewContent({ title: "", desc: "", video_link: "" });
    } catch (err) {
      console.error("Error updating content:", err);
    }
  };



  if (loading) return <h2>Loading contents...</h2>;

  return (
    <div className="course-details">
      <h2>Course Contents</h2>

      {contents.length > 0 ? (
        <ul className="content-list">
          {contents.map((item) => (
            <li key={item._id} className="content-item">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              {item.video_link && (
                <a href={item.video_link} target="_blank" rel="noopener noreferrer">
                  Watch Video
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No contents available yet.</p>
      )}

    </div>
  );
}
