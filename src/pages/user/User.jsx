import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
// import "./User.scss";

const User = () => {
  const { email } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchUserData = async () => {
    //   try {
        const url = currentUser.type === 'CLIENT' 
          ? `/freelancer/getFreelancer?email=${email}`
          : `/client/getClient?email=${email}`;
        const response = await newRequest.get(url);
        setUserData(response.data);
        // if (response.ok) {
        //   const result = await response.json();
        // } else {
        //   throw new Error('Failed to fetch user data');
        // }
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    };

    fetchUserData();
  }, [email, currentUser.type]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

  return (
    <div className="user">
      {userData ? (
        <div>
          <h1>{userData.name}</h1>
          <p>Email: {userData.email}</p>
          <p>Description: {userData.description}</p> {/* Adjust based on actual data */}
          <p>Age: {userData.age}</p> 
          <p>Rate: {userData.rate_per_hour}</p> 
          {/* <p>Description: {userData.description}</p>  */}
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
};

export default User;
