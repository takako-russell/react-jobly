import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await signup(formData);
    navigate("/companies");
  }

  async function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usename</label>
          <input
            className="input-username"
            type="text"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className="input-password"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            className="input-firstname"
            type="text"
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            className="input-lastname"
            type="text"
            name="lastName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            className="input-email"
            type="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <button type="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
