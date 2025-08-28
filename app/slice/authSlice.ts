import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoints } from "@/app/utils/apiEndpoints";
import { HOST_API } from "@/app/utils/config";

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

export const ownerRegisterByPhone = createAsyncThunk(
  "auth/ownerRegisterByPhone",
  async (payload: { name: string; phone: string }, { rejectWithValue }) => {
    try {
      const URL = `${HOST_API}${apiEndpoints.auth.registerByPhone}`;
      const response = await axios.post(URL, payload);
      return response.data;
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
  ownerRegisterByPhoneData: {
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

      // Owner Register By Phone Reducer States
      .addCase(ownerRegisterByPhone.pending, (state) => {
        state.ownerRegisterByPhoneData.isLoading = true;
      })
      .addCase(ownerRegisterByPhone.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.ownerRegisterByPhoneData = {
            isLoading: false,
            status: "failed",
            data: {},
            error: action.payload.error,
          };
        } else {
          state.ownerRegisterByPhoneData = {
            isLoading: false,
            status: "succeeded",
            data: action.payload,
            error: null,
          };
        }
      })
      .addCase(ownerRegisterByPhone.rejected, (state, action) => {
        state.ownerRegisterByPhoneData.isLoading = false;
        state.ownerRegisterByPhoneData.error = action.error.message ?? null;
        state.ownerRegisterByPhoneData.status = "failed";
      });
  },
});

export default authSlice.reducer;
