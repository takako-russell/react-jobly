import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes-nav/Routes";
import Navbar from "./routes-nav/Navbar";
import JoblyApi from "./api/api";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./useLocalStorage/UseLocalStorage";

import "./App.css";
import RouteOverride from "./routes-nav/Routes";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorage("user-token");
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const jwt = require("jsonwebtoken");

  async function signup(data) {
    try {
      let token = JoblyApi.signup(data);
      setToken(token);
    } catch (e) {
      console.error("could not signup", e);
    }
  }

  async function login(data) {
    try {
      let token = await JoblyApi.login(data);
      setToken(token);
      return { success: true };
    } catch (e) {
      console.error("could not login", e);
      return { success: false, e };
    }
  }

  async function logout() {
    try {
      setToken(null);
      setCurrUser(null);
      JoblyApi.setToken(null);
    } catch (e) {
      console.log("error logging out", e);
      return { success: false, e };
    }
  }

  function findAppliedJobs(id) {
    return applicationIds.has(id);
  }

  async function applyJob(jobId) {
    if (findAppliedJobs(jobId)) return;
    JoblyApi.applyJob(currUser.username, jobId);
    setApplicationIds(new Set([...applicationIds, jobId]));
  }

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          //set the latest token value;
          JoblyApi.setToken(token);
          let currUser = await JoblyApi.getCurrUser(username);
          setCurrUser(currUser);
          if (currUser.applications && currUser.applications.length > 0) {
            currUser.applications.forEach((item) => applicationIds.add(item));
          }
          setApplicationIds(applicationIds);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getUser();
  }, [token]);

  return (
    // <div className="App">
    //   <BrowserRouter>
    //     <UserContext.Provider value={{ currUser, setCurrUser }}>
    //       {/* <Navigation logout={logout} /> */}
    //       <Routes login={login} signup={signup} />
    //     </UserContext.Provider>
    //   </BrowserRouter>
    // </div>
    // // <BrowserRouter>
    // <BrowserRouter>
    <UserContext.Provider
      value={{ currUser, applyJob, setCurrUser, findAppliedJobs }}
    >
      <Navbar logout={logout} />
      <RouteOverride signup={signup} login={login} logout={logout} />
    </UserContext.Provider>
    // </BrowserRouter>
    // // </BrowserRouter>
  );
}

export default App;
