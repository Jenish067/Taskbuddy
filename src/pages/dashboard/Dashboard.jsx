import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Clients from './Clients';
import Projects from './Projects';
import Payments from './Payments';
import Freelancers from './Freelancers';

function Dashboard() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/freelancers" element={<Freelancers />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
