import React, { useState, useEffect } from "react";
import newRequest from "./utils/newRequest"; 

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Make GET request to fetch user info
        const response = await newRequest.get("/main/userInfo");
        setUserInfo(response.data);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        // Handle error
      }
    };

    fetchUserInfo();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div className="App">
      <h1>User Information:</h1>
      {userInfo ? (
        <div>
          <p>Fullname: {userInfo.fullname}</p>
          <p>Email: {userInfo.email}</p>
          <p>Type: {userInfo.type}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}

export default App;
