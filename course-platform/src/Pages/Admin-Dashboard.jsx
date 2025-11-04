import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/admin-dashboard.css";

export default function AdminDashboard() {
    const [courses, setCourses] = useState([]);
    const [content, setContent] = useState({ title: "", desc: "", video_link: "" });
    const [message, setMessage] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("adminToken");
            await axios.post("http://localhost:3000/api/admin/content", content, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage("Content added successfully");
            setContent({ title: "", desc: "", video_link: "" });
        } catch (err) {
            setMessage(err.response?.data?.message || "Error adding content");
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <select
                    value={content.course_id}
                    onChange={(e) => setContent({ ...content, course_id: e.target.value })}
                    required
                >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                        <option key={course._id} value={course._id}>
                            {course.course_name}
                        </option>
                    ))}
                </select>
                <input type="text" placeholder="Title" value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} required />
                <textarea placeholder="Description" value={content.desc} onChange={(e) => setContent({ ...content, desc: e.target.value })} />
                <input type="text" placeholder="Video link" value={content.video_link} onChange={(e) => setContent({ ...content, video_link: e.target.value })} />
                <button type="submit">Add Content</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
