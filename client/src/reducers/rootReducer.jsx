import { combineReducers as reduxCombineReducers } from "redux";
import authReducer from "./authReducer";
import calendarReducer from "./calendarReducer";
import uiReducer from "./uiReducer";

const rootReducer = reduxCombineReducers({
  auth: (state, action) => authReducer(state, action),
  ui: (state, action) => uiReducer(state, action),
  calendar: (state, action) => calendarReducer(state, action),
});

export default rootReducer;
