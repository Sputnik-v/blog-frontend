import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params) => {
    const { data } = await axios.post("/login", params);
    return data;
  }
);
export const fetchAuthYou = createAsyncThunk("/auth/fetchAuthYou", async () => {
  const { data } = await axios.post("/you");
  return data;
});

export const fetchRegister = createAsyncThunk(
  "/auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/register", params);
    console.log(data);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchLogin.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchAuthYou.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthYou.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthYou.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
