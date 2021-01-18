import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: null,
    name: null,
    avatarUri: null,
    postNum: null,
    token: null,
  },
  reducers: {
    setUser(state, action) {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.avatarUri = action.payload.avatarUri;
      state.postNum = action.payload.postNum;
      state.token = action.payload.token;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
