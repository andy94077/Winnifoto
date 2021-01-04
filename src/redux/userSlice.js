import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.id;
      state.name = action.name;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
