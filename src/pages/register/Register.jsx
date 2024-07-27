import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    type: "FREELANCER", // default to FREELANCER or CLIENT based on your requirement
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTypeChange = (e) => {
    setUser((prev) => {
      return { ...prev, type: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await newRequest.post("https://taskbuddy-axo5.onrender.com/api/v1/auth/register", {
        name: user.name,
        email: user.email,
        password: user.password,
        type: user.type,
      });
      console.log(response.data.token); // Optionally log the token
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="name">Username</label>
          <input
            name="name"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="type">Account Type</label>
          <select name="type" onChange={handleTypeChange}>
            <option value="FREELANCER">Freelancer</option>
            <option value="CLIENT">Client</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
