import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobList from "../jobs/JobList";

function CompanyDetail() {
  const { handle } = useParams();

  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }

    getCompany();
  }, [handle]);

  if (!company) return <div>LOADIN...</div>;

  return (
    <>
      <div>
        <h4>{company.name}</h4>
        <p>{company.description}</p>
      </div>
      <div>
        <JobList jobs={company.jobs}></JobList>
      </div>
    </>
  );
}

export default CompanyDetail;
