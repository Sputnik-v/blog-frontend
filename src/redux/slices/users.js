import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { randomItemArray } from "../../utils/randomItemArray";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const { data } = await axios.get(`/users`);
  return data;
});

const initialState = {
  users: [],
  status: "loading",
  randomUser: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    randomUsers(state) {
      state.randomUser = [randomItemArray(state.users)];
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.users = {};
      state.status = "loading";
      state.randomUser = {};
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.status = "loaded";
      state.randomUser = [randomItemArray(state.users)];
    },
    [fetchUser.rejected]: (state) => {
      state.users = {};
      state.status = "error";
      state.randomUser = "error, no users";
    },
  },
});

export const userReducer = userSlice.reducer;
export const { randomUsers } = userSlice.actions;
