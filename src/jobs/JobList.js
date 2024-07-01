import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JoblyApi from "../api/api";

function JobList({ jobs = [] }) {
  const [allJobs, setJobs] = useState(jobs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchJobs() {
      try {
        if (allJobs.length === 0) {
          setLoading(true);
          setJobs(await JoblyApi.getJobs());
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.log("Failed to fecth jobs", err);
      }
    }
    fetchJobs();
  }, [allJobs]);

  if (loading) return <div>LOADING...</div>;

  return (
    <div className="JobCardList">
      {allJobs.length > 0 ? (
        allJobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
          />
        ))
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
}

export default JobList;
