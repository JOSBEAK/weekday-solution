import React from "react";
import { useSelector } from "react-redux";
import JobListItem from "./JobListItem";
import JobFilters from "../JobFilters/JobFilters";
import "../../styles/global.css";

function JobList() {
  const { allJobs, filteredJobs, status, error } = useSelector(
    (state) => state.jobBoard
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Job Listings</h2>
      <JobFilters />

      <div className="job-list">
        {allJobs?.length === 0 ? (
          <p>No allJobs found.</p>
        ) : (
          (filteredJobs.length === 0 ? allJobs : filteredJobs)?.map((job) => (
            <JobListItem key={job.jdUid} job={job} />
          ))
        )}
      </div>
    </div>
  );
}

export default JobList;
