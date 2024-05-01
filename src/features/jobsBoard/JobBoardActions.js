// features/jobBoard/jobBoardActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobsAsync = createAsyncThunk(
  "jobBoard/fetchJobs",
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        limit: limit,
        offset: offset,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to fetch job listings");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
