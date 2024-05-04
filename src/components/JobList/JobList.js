import React, { useEffect, useRef } from "react";

import JobListItem from "./JobListItem";
import JobFilters from "../JobFilters/JobFilters";
import "../../styles/global.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchJobsAsync } from "../../features/jobsBoard/JobBoardSlice";
import { ClipLoader } from "react-spinners";
import "../../styles/global.css";
import NotFound from "../NotFound";

function JobList() {
  const { allJobs, filteredJobs, status, error, found, searchQuery } =
    useSelector((state) => state.jobBoard);

  // Filter job listings based on the search query

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

  const jobList = filteredJobs.length === 0 ? allJobs : filteredJobs;

  const jobContainsSearchQuery = (job, query) => {
    const jobRoleLower = job.jobRole.toLowerCase();
    const jobDetailsLower = job.jobDetailsFromCompany.toLowerCase();
    const companyNameLower = job.companyName.toLowerCase();
    const locationLower = job.location.toLowerCase();

    return (
      jobRoleLower.includes(query.toLowerCase()) ||
      jobDetailsLower.includes(query.toLowerCase()) ||
      companyNameLower.includes(query.toLowerCase()) ||
      locationLower.includes(query.toLowerCase())
    );
  };
  const filteredJobsBySearch = jobList.filter((job) =>
    jobContainsSearchQuery(job, searchQuery)
  );

  return (
    <div>
      <div>
        <h2>Job Listings</h2>
      </div>

      <JobFilters />

      <div className="job-list">
        {found === false ? (
          <NotFound />
        ) : allJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <>
            {filteredJobsBySearch.map((job, index) => (
              <JobListItem key={index} job={job} />
            ))}
            <div ref={observerTarget}></div>
            {status === "loading" && (
              <ClipLoader loading={true} size={35} color={"#123abc"} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default JobList;
