import { useState } from "react";
import "../../styles/global.css";

import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import JdModal from "../JdModal";

function JobListItem({ job }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const renderExpectedSalary = () => {
    if (job.minJdSalary !== null && job.maxJdSalary !== null) {
      return `$${job.minJdSalary}k - ${job.maxJdSalary}k ${job.salaryCurrencyCode} ✅`;
    } else {
      return "N/A";
    }
  };
  return (
    <div className="job-item uplifted-component">
      <a href={job.jdLink} className="company-name">
        Weekday
      </a>
      <h3 className="job-role">
        {job.jobRole.charAt(0).toUpperCase() + job.jobRole.slice(1)}
      </h3>
      <p className="job-location">
        {job.location
          ? job.location.charAt(0).toUpperCase() + job.location.slice(1)
          : "N/A"}
      </p>

      <p>Expected Salary: {renderExpectedSalary()} </p>
      {job.jobDetailsFromCompany ? (
        <div className="description">
          <div className="container">
            <strong>About Company</strong>

            <p>{job.jobDetailsFromCompany}</p>
          </div>
          <center>
            <button className="btn-description" onClick={handleOpen}>
              Show more
            </button>
          </center>
        </div>
      ) : (
        <p>N/A</p>
      )}
      <div className="job-experience">
        <h5> Minimum Experience:</h5>
        <p> {job.minExp ? `${job.minExp} years ` : "N/A"}</p>
      </div>

      <button className="apply-btn">
        <ElectricBoltIcon style={{ color: "yellow", fontSize: "medium" }} />
        Easy apply
      </button>
      <button className="referral-btn">Unlock referral asks</button>
      <JdModal
        jobDescription={job.jobDetailsFromCompany}
        open={openModal}
        handleClose={handleClose}
      />
    </div>
  );
}

export default JobListItem;
