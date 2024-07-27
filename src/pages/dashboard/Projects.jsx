import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Sidebar from './Sidebar';
import "./Clients.scss";
import newRequest from '../../utils/newRequest';

// Helper function for fetching project details
const fetchProjectDetails = async (id) => {
  try {
    const response = newRequest.get('https://taskbuddy-axo5.onrender.com/project/all');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch project details', error);
    return null;
  }
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // To hold details of selected project
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    newRequest.get('https://taskbuddy-axo5.onrender.com/project/all')
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
    //   .catch(error => {
    //     setError('Failed to fetch projects');
    //     setLoading(false);
    //   });
  }, []);

  const handleViewDetails = async (id) => {
    const projectDetails = await fetchProjectDetails(id);
    setSelectedProject(projectDetails);
  };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

  return (
    <>
      <div className='main-div'>
        <div className='sidebar'>
          <Sidebar />
        </div>

        <div className="container">
          <h1>Projects</h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map(project => (
                  <TableRow key={project.id}>
                    <TableCell>{project.id}</TableCell>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetails(project.id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedProject && (
            <div className="project-details">
              <h2>Project Details</h2>
              <p><strong>ID:</strong> {selectedProject.id}</p>
              <p><strong>Title:</strong> {selectedProject.title}</p>
              <p><strong>Description:</strong> {selectedProject.description}</p>
              {/* Add more project details here */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
