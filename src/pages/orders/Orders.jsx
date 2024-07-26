import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const { isLoading: isLoadingOrders, error: errorOrders, data: dataOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`https://taskbuddy-axo5.onrender.com/proposal/my-proposals`).then((res) => {
        return res.data;
      }),
  });

  const { isLoading: isLoadingProjects, error: errorProjects, data: dataProjects } = useQuery({
    queryKey: ["proposal"],
    queryFn: () =>
      newRequest.get(`https://taskbuddy-axo5.onrender.com/proposal/my-proposals`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  const [acceptedProposals, setAcceptedProposals] = useState(new Set());

  const handleAccept = async (proposalId) => {
    // try {
      const response = await newRequest.post(`/proposal/${proposalId}/accept`);

      window.location.reload();
      // if (response.ok) {
      //   const result = await response.json();
      //   console.log('Proposal accepted successfully:', result);
      //   // Optionally, update local state or refetch data
        // window.location.reload(); // Refresh the page to see the updated status
      // } else {
      //   console.error('Failed to accept proposal:', response.statusText);
      //   // Handle submission error (e.g., show an error message)
      // }
    // } catch (error) {
    //   console.error('Error accepting proposal:', error);
    //   // Handle network or other errors
    // }
  };

  const handleUserRedirect = (email) => {
    const route = currentUser.type === 'CLIENT' 
      ? `${email}`
      : `${email}`;
    navigate(`/user/${route}`);
  };

  return (
    <div className="orders">
      {isLoadingOrders || isLoadingProjects ? (
        "loading"
      ) : errorOrders || errorProjects ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              {currentUser.type==='CLIENT'&& <th>Freelancer</th>} 
              {currentUser.type==='FREELANCER'&& <th>Client</th>} 
              <th>Contact</th>
              {currentUser.type==='CLIENT'&& <th>Action</th>}
            </tr>
            {dataOrders.map((order) => (
              <tr key={order.proposalid}>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td>{order.project.title}</td>
                <td>{order.project.price}</td>
                {currentUser.type === 'CLIENT' && (
                    <td onClick={() => handleUserRedirect(order.freelancer.email)}>{order.freelancer.name}</td>
                  )}
                  {currentUser.type === 'FREELANCER' && (
                    <td onClick={() => handleUserRedirect(order.client.email)}>{order.client.name}</td>
                  )}
                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
                {currentUser.type === 'CLIENT' && <td>
                    {acceptedProposals.has(order.proposalid) ? (
                      <span>Proposal Accepted</span>
                    ) : (
                      <>
                        <button onClick={() => handleAccept(order.proposalid)}>Accept</button>
                        <button>Reject</button>
                      </>
                    )}
                  </td>}
                
              </tr>
            ))}
          </table>

          {/* <div className="title">
            <h1>Projects</h1>
          </div> */}
          {/* <table>
            <tr>
              <th>Title</th>
              <th>Description</th>
            </tr>
            {dataProjects.map((proposal) => (
              <tr key={proposal.proposalid}>
                <td>{proposal.project.title}</td>
                <td>{proposal.project.description}</td>
              </tr>
            ))}
          </table> */}
        </div>
      )}
    </div>
  );
};

export default Orders;
