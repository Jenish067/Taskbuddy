import React, { useState, useEffect } from 'react';
import './ProposalPage.scss';
import { useNavigate ,Navigate, useLocation } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

const ProposalPage = () => {
  const navigate= useNavigate();
  const location = useLocation();
  const projectData = location.state || {};

  console.log(projectData);

  const [formData, setFormData] = useState({
    clientid: projectData.clientid, // Initialize from state
    projectid: projectData.projectid, // Initialize from state
    price: '',
    proposal: '',
    timeperiod: '',
  });

  console.log(formData);

  useEffect(() => {
    if (projectData.clientid && projectData.projectid) {
      setFormData({
        ...formData,
        clientid: projectData.clientid,
        projectid: projectData.projectid,
      });
    }
  }, [projectData]);

  // Handle input changes for price, proposal, and timeperiod
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      clientid: projectData.clientid,
      projectid: projectData.projectid,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const proposalData = {
      clientid: formData.clientid, // Use value from state
      projectid: formData.projectid, // Use value from state
      proposal: formData.proposal,
      price: parseInt(formData.price),
      timeperiod: formData.timeperiod,
    };

    console.log(proposalData);

    try {
      const response = newRequest.post('https://taskbuddy-axo5.onrender.com/proposal/submit', {
        
          clientid: formData.clientid, // Use value from state
          projectid: formData.projectid, // Use value from state
          proposal: formData.proposal,
          price: parseInt(formData.price),
          timeperiod: formData.timeperiod,
      });
      navigate('/orders')
      if (response.ok) {
        const result = await response.json();
        console.log('Proposal submitted successfully:', result);
        // navigate('/orders')
      } else {
        console.error('Failed to submit proposal:', response.statusText);
        // Handle submission error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
      // Handle network or other errors
    }
  };

  return (
    <div className="proposal-page">
      <h1>Submit Your Proposal</h1>
      <form className="proposal-form" onSubmit={handleSubmit}>
        {/* <div className="form-group">
          <label htmlFor="clientId">Client ID</label>
          <input
            type="text"
            id="clientId"
            name="clientid"
            value={formData.clientid}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <p id="title">{projectData.title || 'No title provided'}</p>
          {/* <p id="title" typ="text" value={projectData.title} onChange={(e) => setProjectData({ ...projectData, title: e.target.value })} /> */}
          {/* <input
            type="text"
            id="title"
            name="title"
            value={formData.projectid}
            onChange={handleChange}
            required
          /> */}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="proposal">Description</label>
          <textarea
            id="proposal"
            name="proposal"
            value={formData.proposal}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="timePeriod">Time Period</label>
          <input
            type="text"
            id="timePeriod"
            name="timeperiod"
            value={formData.timeperiod}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Proposal</button>
      </form>
    </div>
  );
};

export default ProposalPage;
