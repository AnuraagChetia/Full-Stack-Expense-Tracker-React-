import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    premium: "",
    totalExpense: "",
  },
  reducers: {
    getUser(state, action) {
      console.log(action.payload);
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.premium = action.payload.premium;
      state.totalExpense = action.payload.totalExpense;
    },
  },
});

export const userActons = userSlice.actions;

export default userSlice.reducer;
