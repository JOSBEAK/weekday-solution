import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [], // Array to hold all job listings fetched by the API
  filteredJobs: [], // Array to hold filtered job listings
  filters: {
    experience: [],
    roles: [],
    numberOfEmployees: [],
    location: [],
    minBasePay: [],
  },
  found: true,
  searchQuery: "",
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
        `https://api.weekday.technology/adhoc/getSampleJdJSON?limit=${limit}&offset=${offset}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to fetch job listings");
      }

      const data = await response.json();

      return data.jdList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const jobBoardSlice = createSlice({
  name: "jobBoard",
  initialState,
  reducers: {
    updateSearchQuery(state, action) {
      state.searchQuery = action.payload; // Update the search query state
    },
    updateFilters(state, action) {
      state.filters = action.payload;

      // Apply filters to all jobs and store the result in filteredJobs
      state.filteredJobs = applyFilters(state.allJobs, state.filters);
      const filtersWithValues = Object.values(state.filters).filter(
        (field) => field?.length > 0
      );
      if (filtersWithValues.length > 0 && state.filteredJobs.length === 0) {
        state.found = false;
      } else {
        state.found = true;
      }
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
        state.allJobs = [...state.allJobs, ...action.payload];
        state.filteredJobs = applyFilters(state.allJobs, state.filters);
      })
      .addCase(fetchJobsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Function to apply filters to jobs
const applyFilters = (jobs, filters) => {
  const { experience, roles, numberOfEmployees, location, minBasePay } =
    filters;

  return jobs?.filter((job) => {
    return (
      (experience?.length === 0 ||
        parseInt(job.minExp) === parseInt(experience?.value)) &&
      (roles?.length === 0 ||
        roles.some((role) => role.value === job.jobRole)) &&
      (numberOfEmployees?.length === 0 ||
        numberOfEmployees.some((emp) => emp.value === job.numberOfEmployees)) &&
      (location?.length === 0 ||
        location.some((loc) => loc.value === job.location)) &&
      (minBasePay?.length === 0 ||
        parseInt(job.minJdSalary) >= parseInt(minBasePay.value))
      // Add more filter conditions as needed
    );
  });
};

// Export actions
export const { updateFilters, updateSearchQuery } = jobBoardSlice.actions;

// Export reducer
export default jobBoardSlice.reducer;
