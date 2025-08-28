import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoints } from "@/app/utils/apiEndpoints";
import { HOST_API } from "@/app/utils/config";
import { removeItem } from "../hooks/useLocalStorage";

export const ownerRegisterByEmail = createAsyncThunk(
  "auth/ownerRegisterByEmail",
  async (
    payload: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const URL = `${HOST_API}${apiEndpoints.auth.registerByEmail}`;
      console.log("URL", URL);
      const response = await axios.post(URL, payload);
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const ownerLoginByEmail = createAsyncThunk(
  "auth/ownerLoginByEmail",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const URL = `${HOST_API}${apiEndpoints.auth.loginByEmail}`;
      const response = await axios.post(URL, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await removeItem("userDetails");
      return {};
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: {
  [key: string]: {
    isLoading: boolean;
    data: {};
    status: string;
    error: string | null;
  };
} = {
  ownerRegisterByEmailData: {
    isLoading: false,
    data: {},
    status: "",
    error: null,
  },
  ownerLoginByEmailData: {
    isLoading: false,
    data: {},
    status: "",
    error: null,
  },
};

const authSlice = createSlice({
  name: "authSlc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Owner Register By Email Reducer States
      .addCase(ownerRegisterByEmail.pending, (state) => {
        state.ownerRegisterByEmailData.isLoading = true;
      })
      .addCase(ownerRegisterByEmail.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.ownerRegisterByEmailData = {
            isLoading: false,
            status: "failed",
            data: {},
            error: action.payload.error,
          };
        } else {
          state.ownerRegisterByEmailData = {
            isLoading: false,
            status: "succeeded",
            data: action.payload,
            error: null,
          };
        }
      })
      .addCase(ownerRegisterByEmail.rejected, (state, action) => {
        state.ownerRegisterByEmailData.isLoading = false;
        state.ownerRegisterByEmailData.error = action.error.message ?? null;
        state.ownerRegisterByEmailData.status = "failed";
      })

      // Owner Login By Email Reducer States
      .addCase(ownerLoginByEmail.pending, (state) => {
        state.ownerLoginByEmailData.isLoading = true;
      })
      .addCase(ownerLoginByEmail.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.ownerLoginByEmailData = {
            isLoading: false,
            status: "failed",
            data: {},
            error: action.payload.error,
          };
        } else {
          state.ownerLoginByEmailData = {
            isLoading: false,
            status: "succeeded",
            data: action.payload,
            error: null,
          };
        }
      })
      .addCase(ownerLoginByEmail.rejected, (state, action) => {
        state.ownerLoginByEmailData.isLoading = false;
        state.ownerLoginByEmailData.error = action.error.message ?? null;
        state.ownerLoginByEmailData.status = "failed";
      });
  },
});

export default authSlice.reducer;
