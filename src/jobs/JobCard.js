import React, { useContext, useState, useEffect } from "react";
import "./jobCard.css";
import UserContext from "../auth/UserContext";

function JobCard({ id, title, salary, equity, companyName }) {
  const { findAppliedJobs, applyJob } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    async function updateAppliedStatus() {
      console.debug("JobCard useEffect updateAppliedStatus", "id=", id);
      const isApplied = await findAppliedJobs(id);
      setApplied(isApplied);
      console.log(applied);
    }
    updateAppliedStatus();
  }, [id, findAppliedJobs]);

  async function handleApply() {
    applyJob(id);
    setApplied(true);
  }

  return (
    <div className="JobCard card">
      <h3>{title}</h3>
      <p>Salary:{salary}</p>
      <p>equity:{equity}</p>

      <div>
        <button disabled={applied ? true : undefined} onClick={handleApply}>
          APPLY
        </button>
      </div>
    </div>
  );
}

export default JobCard;
