import React, { useEffect, useRef } from "react";

import JobListItem from "./JobListItem";
import JobFilters from "../JobFilters/JobFilters";
import "../../styles/global.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchJobsAsync } from "../../features/jobsBoard/JobBoardSlice";

import "../../styles/global.css";

function JobList() {
  const { allJobs, filteredJobs, status, error } = useSelector(
    (state) => state.jobBoard
  );
  const dispatch = useDispatch();
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchJobsAsync({ limit: 9, offset: allJobs.length }));
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [dispatch, allJobs]);

  if (status === "loading" && allJobs.length === 0) {
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
        {allJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <>
            {filteredJobs.length === 0
              ? allJobs.map((job, index) => (
                  <JobListItem key={index} job={job} />
                ))
              : filteredJobs.map((job, index) => (
                  <JobListItem key={index} job={job} />
                ))}
            <div ref={observerTarget}></div>
          </>
        )}
      </div>
    </div>
  );
}

export default JobList;
