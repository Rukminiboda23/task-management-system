// frontend/src/components/LoginPage.js
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify'; // Import toast
import '../Auth.css';

const LoginPage = () => {
    const { user, loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = e => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        if (username.length > 0) {
            loginUser(username, password)
                .catch(error => {
                    // --- THIS IS THE CRUCIAL CHANGE ---
                    // Get the specific error message from the backend's response
                    const errorMessage = error.response?.data?.detail || "Login failed! Please check credentials.";
                    toast.error(errorMessage); // Display the specific error
                    console.error("Login error response:", error.response); // Log for debugging
                });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Welcome Back!</h1>
                <p>Please enter your details to sign in.</p>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
                <p className="switch-auth-link">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;