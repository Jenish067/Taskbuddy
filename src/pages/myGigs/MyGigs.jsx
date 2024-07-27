import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      Promise.all([
        newRequest.get(`https://taskbuddy-axo5.onrender.com/project/my-projects`),
        // newRequest.get(`https://taskbuddy-axo5.onrender.com/proposal/my-proposal?email=${currentUser.email}`)
      ]).then(([projectsRes, proposalsRes]) => {
        return {
          projects: projectsRes.data,
          // proposals: proposalsRes.data
        };
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`api/conversations/${id}`);
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

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            {currentUser.type ==="CLIENT" && (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <h2>Projects</h2>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Freelancer</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Status</th>
                <th>Time Period</th>
              </tr>
            </thead>
            <tbody>
              {data.projects.map((gig) => (
                <tr key={gig.projectid}>
                  <td>
                    <img className="image" src={gig.cover} alt="" />
                  </td>
                  <td>{gig.freelancer && gig.freelancer.name ? gig.freelancer.name : null}</td>
                  <td>{gig.title}</td>
                  <td>{gig.price}</td>
                  <td>{gig.payment_type}</td>
                  <td>{gig.status}</td>
                  <td>{gig.time_period}</td>
                  {/* <td>
                    <img
                      className="delete"
                      src="./img/delete.png"
                      alt=""
                      onClick={() => handleDelete(gig._id)}
                    />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          {/* <h2>Proposals</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.proposals.map((proposal) => (
                <tr key={proposal._id}>
                  <td>{proposal.title}</td>
                  <td>{proposal.description}</td>
                  <td>{proposal.status}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      )}
    </div>
  );
}

export default MyGigs;
