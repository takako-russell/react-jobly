import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navbar.css";

function Navbar({ logout }) {
  const { currUser } = useContext(UserContext);
  // const currUser = null;

  function afterLoginNav() {
    return (
      <ul className="navbar-main-nav">
        <li className="nav-item navbar-brand">
          <NavLink to="/">Jobly</NavLink>
        </li>
        <li>
          <div className="nav-links-section">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/companies">
                  Companies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/jobs">
                  Jobs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={logout}>
                  Log out {currUser.firstname || currUser.username}
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    );
  }

  function beforeLoginNav() {
    return (
      <ul className="navbar-nav">
        <li className="navbar-brand nav-item">
          <NavLink to="/">Jobly</NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup">Sign Up</NavLink>
        </li> */}
      </ul>
    );
  }

  return <nav>{currUser ? afterLoginNav() : beforeLoginNav()}</nav>;
}

export default Navbar;
