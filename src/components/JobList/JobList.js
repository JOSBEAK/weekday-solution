// components/JobList/JobList.js

import React from "react";
import { useSelector } from "react-redux";
import JobListItem from "./JobListItem"; // Import JobListItem component
import JobFilters from "../JobFilters/JobFilters"; // Import JobFilters component
import "../../styles/global.css";

function JobList() {
  const { jobs, status, error } = useSelector((state) => state.jobBoard);

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
        {jobs?.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs?.map((job) => <JobListItem key={job.jdUid} job={job} />)
        )}
      </div>
    </div>
  );
}

export default JobList;
