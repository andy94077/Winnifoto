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
    clearUser(state) {
      state._id = null;
      state.name = null;
      state.avatarUri = null;
      state.postNum = null;
      state.token = null;
    },
    setAvatarUri(state, action) {
      state.avatarUri = action.payload;
    },
  },
});

export const { setUser, clearUser, setAvatarUri } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
