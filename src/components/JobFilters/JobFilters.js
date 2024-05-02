// components/JobFilters/JobFilters.js

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../../features/jobsBoard/JobBoardSlice";

function JobFilters() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.jobBoard);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFilters({ [name]: value }));
  };

  return (
    <div className="job-filters">
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        Job Type:
        <select
          name="jobType"
          value={filters.jobType}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
          {/* Add more job types as needed */}
        </select>
      </label>
    </div>
  );
}

export default JobFilters;
