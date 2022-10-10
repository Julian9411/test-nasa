import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  userSelect: {
    label: string;
    key: string;
  };
}

const initialState: userState = {
  userSelect: {
    label: "",
    key: "",
  },
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectedUser: (
      state,
      action: PayloadAction<{ key: string; label: string }>
    ) => {
      state.userSelect = action.payload;
    },
  },
});

export const { selectedUser } = usersSlice.actions;

export default usersSlice.reducer;
