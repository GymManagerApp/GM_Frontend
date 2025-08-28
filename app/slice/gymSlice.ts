import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoints } from "@/app/utils/apiEndpoints";
import { HOST_API } from "@/app/utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addGym = createAsyncThunk(
  "gym/addGym",
  async (payload: { name: string; city: string }, { rejectWithValue }) => {
    const userDetails: any = JSON.parse(
      (await AsyncStorage.getItem("userDetails")) || "{}"
    );
    try {
      const payloadData = {
        name: payload.name,
        address: {
          city: payload.city,
        },
        userId: userDetails?._id,
      };
      console.log("\n\n\npayloadData: ", payloadData);
      const URL = `${HOST_API}${apiEndpoints.gym.addGym}`;
      console.log("URL", URL);
      console.log("userDetails", userDetails);
      const response = await axios.post(URL, payloadData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails?.token}`,
        },
      });
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
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
  addGymData: {
    isLoading: false,
    data: {},
    status: "",
    error: null,
  },
};

const gymSlice = createSlice({
  name: "gymSlc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGym.pending, (state) => {
        state.addGymData.isLoading = true;
      })
      .addCase(addGym.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.addGymData = {
            isLoading: false,
            status: "failed",
            data: {},
            error: action.payload.error,
          };
        } else {
          state.addGymData = {
            isLoading: false,
            status: "succeeded",
            data: action.payload,
            error: null,
          };
        }
      })
      .addCase(addGym.rejected, (state, action) => {
        state.addGymData.isLoading = false;
        state.addGymData.error = action.error.message ?? null;
        state.addGymData.status = "failed";
      });
  },
});

export default gymSlice.reducer;
