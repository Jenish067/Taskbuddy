import React from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.scss";

function Sidebar() {
  return (
    <div className='main-div'>
        <div className='div_1'>
            <h1>Dashboard</h1>
        <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/clients" className="nav-link">Clients</Link>
        </li>
        <hr></hr>
        <li className="nav-item">
          <Link to="/freelancers" className="nav-link">Freelancers</Link>
        </li>
        <hr></hr>
        <li className="nav-item">
          <Link to="/projects" className="nav-link">Projects</Link>
        </li>
        <hr></hr>
        <li className="nav-item">
          <Link to="/payments" className="nav-link">Payments</Link>
        </li>
      </ul>
      <div className='third-div'>
      <li className="nav-item">
          <Link className="nav-link">Logout</Link>
        </li>
      </div>  
      </div>
    </div>
  );
}

export default Sidebar;
