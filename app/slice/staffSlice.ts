import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import {
  listGymUsers,
  createGymUser,
  updateGymUser,
  deleteGymUser,
  getGymUserById,
} from "@/app/services/gymUsers";

export type GymUser = {
  _id: string;
  gymId: string;
  role: number; // 0 admin, 1 staff (per backend)
  status?: string;
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

interface StaffState {
  items: GymUser[];
  current: GymUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: StaffState = {
  items: [],
  current: null,
  loading: false,
  error: null,
};

export const fetchStaff = createAsyncThunk("staff/fetchAll", async () => {
  const res = await listGymUsers();
  return res as any as GymUser[];
});

export const fetchStaffById = createAsyncThunk("staff/fetchById", async (id: string) => {
  const res = await getGymUserById(id);
  return res as any as GymUser;
});

export const createStaff = createAsyncThunk(
  "staff/create",
  async (payload: { gymId: string; role: number; userInfo: { name?: string; email?: string; phone?: string } }) => {
    const res = await createGymUser(payload);
    return res as any as GymUser;
  }
);

export const updateStaff = createAsyncThunk(
  "staff/update",
  async ({ id, data }: { id: string; data: Partial<{ gymId: string; role: number; userInfo: { name?: string; email?: string; phone?: string } }> }) => {
    const res = await updateGymUser(id, data);
    return res as any as GymUser;
  }
);

export const deleteStaff = createAsyncThunk("staff/delete", async (id: string) => {
  await deleteGymUser(id);
  return id;
});

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action: PayloadAction<GymUser[]>) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch staff";
      })
      .addCase(fetchStaffById.fulfilled, (state, action: PayloadAction<GymUser>) => {
        state.current = action.payload;
      })
      .addCase(createStaff.fulfilled, (state, action: PayloadAction<GymUser>) => {
        // Prepend new item
        if (action.payload) {
          state.items = [action.payload, ...state.items];
        }
      })
      .addCase(updateStaff.fulfilled, (state, action: PayloadAction<GymUser>) => {
        const updated = action.payload;
        state.items = state.items.map((it) => (it._id === updated._id ? updated : it));
        state.current = updated;
      })
      .addCase(deleteStaff.fulfilled, (state, action: PayloadAction<string>) => {
        const id = action.payload;
        state.items = state.items.filter((it) => it._id !== id);
        if (state.current && state.current._id === id) state.current = null;
      });
  },
});

export const { clearCurrent } = staffSlice.actions;

export const selectStaff = (state: RootState) => state.staffSlc.items;
export const selectStaffLoading = (state: RootState) => state.staffSlc.loading;
export const selectStaffCurrent = (state: RootState) => state.staffSlc.current;

export default staffSlice.reducer;
