import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import CompanyDetail from "../companies/CompanyDetail";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import ProfileForm from "../profiles/ProfileForm";
import PrivateRoute from "./PrivateRoute";

function RouteOverride({ login, signup, handle }) {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />}></Route>
      <Route exact path="/login" element={<LoginForm login={login} />}></Route>

      <Route
        exact
        path="/signup"
        element={<SignupForm signup={signup} />}
      ></Route>
      <Route
        path="/companies"
        element={
          <PrivateRoute>
            <CompanyList />
          </PrivateRoute>
        }
      />
      <Route
        path="/companies/:handle"
        element={
          <PrivateRoute>
            <CompanyDetail handle={handle} />
          </PrivateRoute>
        }
      />
      <Route
        path="/jobs"
        element={
          <PrivateRoute>
            <JobList handle={handle} />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfileForm />
          </PrivateRoute>
        }
      />
      {/* <PrivateRoute
        exact
        path="/companies"
        children={<CompanyList />}
      ></PrivateRoute> */}

      {/* <PrivateRoute exact path="/jobs">
        <JobList />
      </PrivateRoute> */}
      {/* 
      <PrivateRoute exact path="/companies/:handle">
        <CompanyDetail />
      </PrivateRoute>

      <PrivateRoute path="/profile">
        <ProfileForm />
      </PrivateRoute> */}
      {/* </Route> */}
    </Routes>
  );
}

export default RouteOverride;
