// store/rootReducer.js

import { combineReducers } from "redux";
import jobBoardReducer from "../features/jobsBoard/JobBoardSlice";

const rootReducer = combineReducers({
  jobBoard: jobBoardReducer,
  // Add other reducers here if you have them
});

export default rootReducer;
