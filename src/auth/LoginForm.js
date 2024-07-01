import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await login(formData);
    navigate("/");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="login-form-wrapper">
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
