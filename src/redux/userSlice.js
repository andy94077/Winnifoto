import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: 0,
    name: "Yueh",
    avatarUri: "/images/y.jpg",
    postNum: 0,
    token: "YuehTOKENOAO",
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
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
