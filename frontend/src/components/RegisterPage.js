// frontend/src/components/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosClient'
import { toast } from 'react-toastify'; // Import toast
import '../Auth.css';

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/accounts/register/', { username, password });
            toast.success("Registration successful! Please log in.");
            navigate('/login');
        } catch (error) {
            // --- THIS IS THE CRUCIAL CHANGE ---
            let errorMessage = "Registration failed. Please try again.";
            if (error.response && error.response.data) {
                // Combine all error messages from the backend
                errorMessage = Object.values(error.response.data).join(' ');
            }
            toast.error(errorMessage); // Display the specific error
            console.error("Registration error response:", error.response); // Log for debugging
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Create an Account</h1>
                <p>Start organizing your tasks today.</p>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={e => setUsername(e.target.value)} placeholder="Choose a username" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={e => setPassword(e.target.value)} placeholder="Choose a secure password" required/>
                    </div>
                    <button type="submit">Create Account</button>
                </form>
                <p className="switch-auth-link">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;