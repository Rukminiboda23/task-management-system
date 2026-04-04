// frontend/src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
const Layout = ({ children, theme, toggleTheme }) => {
return (
<div className="layout-container">
<Sidebar theme={theme} toggleTheme={toggleTheme} />
<main className="main-content">
{children}
</main>
</div>
);
};
export default Layout;