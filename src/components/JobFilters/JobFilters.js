import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFilters,
  updateSearchQuery,
} from "./../../features/jobsBoard/JobBoardSlice";

function JobFilters() {
  const allJobs = useSelector((state) => state.jobBoard.allJobs);
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [numberOfEmployees, setNumberOfEmployees] = useState([]);
  const [experience, setExperience] = useState([]);
  const [location, setLocation] = useState([]);
  const [minBasePay, setMinBasePay] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    roles: [],
    numberOfEmployees: [],
    experience: [],
    location: [],
    minBasePay: [],
  });

  useEffect(() => {
    // Extract unique values for each filter category
    const uniqueRoles = [...new Set(allJobs.map((job) => job.jobRole))];
    const uniqueNumberOfEmployees = [
      "1-10",
      "10-50",
      "50-100",
      "100-500",
      "500+",
    ];
    const uniqueExperience = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10+",
    ];
    const uniqueLocations = [...new Set(allJobs.map((job) => job.location))];
    const uniqueMinBasePay = [
      "0",
      "10",
      "20",
      "30",
      "40",
      "50",
      "60",
      "70",
      "80",
      "90",
      "100",
    ];

    // Setting the state directly with the extracted values
    setRoles(
      uniqueRoles.filter(Boolean).map((role) => ({ value: role, label: role }))
    );
    setNumberOfEmployees(
      uniqueNumberOfEmployees
        .filter(Boolean)
        .map((emp) => ({ value: emp, label: emp }))
    );
    setExperience(
      uniqueExperience
        .filter(Boolean)
        .map((exp) => ({ value: exp, label: exp }))
    );
    setLocation(
      uniqueLocations.filter(Boolean).map((loc) => ({ value: loc, label: loc }))
    );
    setMinBasePay(
      uniqueMinBasePay
        .filter(Boolean)
        .map((pay) => ({ value: pay, label: `$${pay}k` }))
    );
  }, [allJobs]);

  useEffect(() => {
    dispatch(updateFilters(selectedOptions));
  }, [selectedOptions, dispatch]);

  const handleChange = (name, newSelectedOptions) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [name]: newSelectedOptions ? newSelectedOptions : [],
    }));
  };

  // Add a function to handle search input change
  const handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    dispatch(updateSearchQuery(searchQuery)); // Dispatch action to update search query state
  };

  return (
    <div className="Filters">
      <div id="roles">
        <b>Roles</b>
        <Select
          isMulti
          placeholder="Roles"
          value={selectedOptions.roles}
          options={roles}
          onChange={(selectedOptions) => handleChange("roles", selectedOptions)}
        />
      </div>
      <div id="total-strength">
        <b>No. of Employees</b>
        <Select
          isMulti
          placeholder="Select Option"
          value={selectedOptions.numberOfEmployees}
          options={numberOfEmployees}
          onChange={(selectedOptions) =>
            handleChange("numberOfEmployees", selectedOptions)
          }
        />
      </div>
      <div id="experience">
        <b>Experience</b>
        <Select
          isClearable
          placeholder="Experience"
          value={selectedOptions.experience}
          options={experience}
          onChange={(selectedOptions) =>
            handleChange("experience", selectedOptions)
          }
        />
      </div>
      <div id="location">
        <b>Location</b>
        <Select
          isMulti
          placeholder="Location"
          value={selectedOptions.location}
          options={location}
          onChange={(selectedOptions) =>
            handleChange("location", selectedOptions)
          }
        />
      </div>
      <div id="pay">
        <b>Min. Base Pay</b>
        <Select
          isClearable
          placeholder="Min. Base Pay"
          value={selectedOptions.minBasePay}
          options={minBasePay}
          onChange={(selectedOptions) =>
            handleChange("minBasePay", selectedOptions)
          }
        />
      </div>
      <div id="search">
        <b>Search ...</b>
        <input placeholder="Search Jobs" onChange={handleSearchChange}></input>
      </div>
    </div>
  );
}

export default JobFilters;
