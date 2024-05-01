// store/configureStore.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  // Optionally, you can configure middleware, devTools, etc. here
});

export default store;
