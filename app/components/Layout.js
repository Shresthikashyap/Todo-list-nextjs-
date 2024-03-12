
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <div style={{ background: 'black', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
        <h1>Simple To-Do List</h1>
      </div>
      {children}
    </div>
  );
};

export default Layout;
