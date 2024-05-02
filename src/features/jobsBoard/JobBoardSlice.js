// features/jobBoard/jobBoardSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  jobs: [], // Array to hold job listings
  filters: {
    // Object to hold filter values
    location: "",
    jobType: "",
    // Add more filter options as needed
  },
  status: "idle", // Status of the async operation (idle, loading, succeeded, failed)
  error: null, // Error message if the operation fails
};

export const fetchJobsAsync = createAsyncThunk(
  "jobBoard/fetchJobs",
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        limit: 50,
        offset: offset,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `https://api.weekday.technology/adhoc/getSampleJdJSON?limit=${limit}&offset=${offset}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to fetch job listings");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const jobBoardSlice = createSlice({
  name: "jobBoard",
  initialState,
  reducers: {
    updateFilters(state, action) {
      // Update filter values based on user selections
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchJobsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload.jdList; // Corrected payload access
        console.log(action.payload);
      })
      .addCase(fetchJobsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Corrected error handling
      });
  },
});

// Export actions
export const { updateFilters } = jobBoardSlice.actions;

// Export reducer
export default jobBoardSlice.reducer;
