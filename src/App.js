// App.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsAsync } from "./features/jobsBoard/JobBoardSlice";
import JobList from "./components/JobList/JobList";

function App() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.jobBoard);

  useEffect(() => {
    // Fetch job listings when the component mounts
    dispatch(fetchJobsAsync({ limit: 10, offset: 10 }));
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <JobList />
    </div>
  );
}

export default App;
