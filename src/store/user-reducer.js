import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    premium: "",
  },
  reducers: {
    getUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.premium = action.payload.premium;
    },
  },
});

export const userActons = userSlice.actions;

export default userSlice.reducer;
