// frontend/src/components/Sidebar.js
import { FiHome, FiSun, FiMoon, FiPlusCircle, FiLogOut } from 'react-icons/fi';
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Sidebar = ({ theme, toggleTheme }) => {

  const { logoutUser } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <FiHome />
        <h2>TaskFlow</h2>
      </div>
      <nav className="sidebar-nav">
        <button className="add-task-btn-sidebar">
           <FiPlusCircle />
           <span>Add New Task</span>
        </button>
      </nav>
      <div className="sidebar-footer">
         
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <FiMoon /> : <FiSun />}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
        <button className="logout-btn" onClick={logoutUser}>
          <FiLogOut />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;