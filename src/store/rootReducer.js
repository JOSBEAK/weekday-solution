import { combineReducers } from "redux";
import jobBoardReducer from "../features/jobsBoard/JobBoardSlice";

const rootReducer = combineReducers({
  jobBoard: jobBoardReducer,
});

export default rootReducer;
