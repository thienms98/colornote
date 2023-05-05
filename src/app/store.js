import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/Auth/userSlice";
import settingsReducer from "./reducers/settings";

const rootReducer = {
  user: userReducer,
  settings: settingsReducer,
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;
