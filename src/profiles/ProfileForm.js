import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";
import JoblyApi from "../api/api";
import "./ProfileForm.css";

function ProfileForm() {
  const { currUser, setCurrUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: currUser.username,
    password: currUser.password,
    email: currUser.email,
    firstName: currUser.firstName,
    lastName: currUser.lastName,
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let newData = {
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.saveNewProfile(username, newData);
    } catch (e) {
      console.log("could not update the profile", e);
    }

    setFormData((f) => ({ ...f, password: "" }));
    setCurrUser(updatedUser);
  }

  return (
    <div className="profile-form-wrapper">
      <form>
        <div className="form-input-wrapper">
          <label>Username</label>
          <input
            name="username"
            className="form-input"
            value={formData.username}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-input-wrapper">
          <label>Email</label>
          <input
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-input-wrapper">
          <label>First Name</label>
          <input
            name="firstName"
            className="form-input"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-input-wrapper">
          <label>Last Name</label>
          <input
            name="lastName"
            className="form-input"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        {/* <div className="form-input-wrapper">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
          />
        </div> */}

        <button onClick={handleSubmit}>Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileForm;
