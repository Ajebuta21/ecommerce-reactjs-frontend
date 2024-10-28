import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: [],
  auth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.profile = action.payload;
      state.auth = true;
    },
    removeUser: (state) => {
      state.profile = [];
      state.auth = false;
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;