import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import gymReducer from "../slice/gymSlice";
import staffReducer from "../slice/staffSlice";

export const store = configureStore({
    reducer: {
        authSlc: authReducer,
        gymSlc: gymReducer,
        staffSlc: staffReducer,
    }
})

// ✅ Types for state & dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;