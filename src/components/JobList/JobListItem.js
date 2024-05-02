// components/JobList/JobListItem.js

import "../../styles/global.css";

import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

function JobListItem({ job }) {
  const renderExpectedSalary = () => {
    if (job.minJdSalary !== null && job.maxJdSalary !== null) {
      return `$${job.minJdSalary}k - ${job.maxJdSalary}k ${job.salaryCurrencyCode} ✅`;
    } else {
      return "N/A";
    }
  };
  return (
    <div className="job-item uplifted-component">
      <h3>{job.jobRole}</h3>

      <a href={job.jdLink}>Weekday</a>

      {job.location ? <p>{job.location}</p> : <p>N/A</p>}
      <p>Expected Salary: {renderExpectedSalary()} </p>
      {job.jobDetailsFromCompany ? (
        <div className="description">
          <div className="container">
            <strong>About Company</strong>
            <p>
              <b>About Us</b>
            </p>

            <p>{job.jobDetailsFromCompany}</p>
          </div>
          <center>
            <a href={job.jdLink}>View Job</a>
          </center>
        </div>
      ) : (
        <p>N/A</p>
      )}
      <p>Minimum Experience: {job.minExp ? <p>{job.minExp}</p> : <p>N/A</p>}</p>

      <button className="apply-btn">
        <ElectricBoltIcon style={{ color: "yellow", fontSize: "medium" }} />
        Easy apply
      </button>
      <button className="referral-btn">Unlock referral asks</button>
    </div>
  );
}

export default JobListItem;
