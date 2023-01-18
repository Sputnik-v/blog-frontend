import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchOneUser = createAsyncThunk(
  "oneUser/fetchOneUser",
  async (id) => {
    const { data } = await axios.get(`/users/${id}`);
    return data;
  }
);

const initialState = {
  oneUser: {},
  status: "loading",
};

const oneUserSlice = createSlice({
  name: "oneUser",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOneUser.pending]: (state) => {
      state.oneUser = {};
      state.status = "loading";
    },
    [fetchOneUser.fulfilled]: (state, action) => {
      state.oneUser = action.payload;
      state.status = "loaded";
    },
    [fetchOneUser.rejected]: (state) => {
      state.oneUser = {};
      state.status = "error";
    },
  },
});

export const oneUSerReducer = oneUserSlice.reducer;
