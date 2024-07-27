import React, { useState } from "react";
import "./Login.scss";
import newRequest, { setAuthToken } from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the POST request to authenticate the user
      const response = await newRequest.post("https://taskbuddy-axo5.onrender.com/api/v1/auth/authenticate", {
        email,
        password,
      });

      // Assuming the response contains a token upon successful authentication
      const { token } = response.data;

      // Store the token in local storage for future requests or authentication
      localStorage.setItem("token", token);

      // Set authorization header for subsequent requests
      setAuthToken(token);
      const info = await newRequest.get("/main/userInfo");
      localStorage.setItem("currentUser", JSON.stringify(info.data));
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if(currentUser.type==="ADMIN"){
        navigate('/clients')
      }
      else{
        navigate("/");
      }
      // Redirect the user to the home page or any desired location upon successful login
      
    
    } catch (err) {
      // Handle errors from the API response
      setError(err.response?.data || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="johndoe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        {/* Display error message if there's an error */}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
