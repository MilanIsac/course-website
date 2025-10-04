import React, { useState } from 'react'
import axios from 'axios';
import "../styles/add-new-course.css";
import { useNavigate } from 'react-router-dom';

export default function AddNewCourse({ onAdd }) {
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/api/courses", {
                course_name: courseName,
                desc: description,
            });

            console.log("Added new course: ", res.data);
            setError("");

            if (onAdd) {
                onAdd(res.data);
            }

            setDescription("");
            setCourseName("");

            navigate('/')
        }
        catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Adding course failed");
        }
    };

    return (
        <div>
            <form className='add-new-course' onSubmit={handleSubmit}>
                <h2>Add New Course</h2>

                {error && <p className='error'>{error}</p>}

                <label>Course Name</label>
                <input
                    type="text"
                    placeholder='Enter course name'
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    required
                />

                <label>Description</label>
                <textarea
                    placeholder='Enter course description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>

                <button className='submit-btn'>Submit</button>
            </form>
        </div>
    )
}