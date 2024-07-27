import React from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar /> {/* Render the Sidebar */}
      <div style={{ marginLeft: '250px', padding: '20px', flexGrow: 1 }}>
        {children} {/* Render the main content */}
      </div>
    </div>
  );
};

export default Layout;
