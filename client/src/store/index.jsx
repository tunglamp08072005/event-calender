import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false, // Bỏ qua cảnh báo liên quan đến moment.js
});

const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});

export default store;
