import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import TaskList from './components/TaskList';
import Layout from './components/Layout'; // Import new Layout
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AuthContext from './context/AuthContext';
import { ToastContainer } from 'react-toastify'; // <-- 1. Import
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const { user } = useContext(AuthContext);
  // State to manage the theme
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Apply the theme class to the body
    document.body.className = '';
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
        <div className="App">
          <ToastContainer theme={theme} />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={
                    user ? (
                        <Layout theme={theme} toggleTheme={toggleTheme}>
                            <Header />
                            <TaskList />
                        </Layout>
                    ) : (
                        <LoginPage />
                    )
                } />
            </Routes>
        </div>
  );
}

export default App;