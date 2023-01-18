import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/post");
  return data.reverse(); //возвращаем массив в обратном порядке индексов
});

export const fetchDeletePost = createAsyncThunk(
  "posts/fetchDeletePost",
  async (id) => {
    await axios.delete(`/post/${id}`);
  }
);

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async (id) => {
    const { data } = await axios.get(`/comment/${id}`);
    return data;
  }
);

const initialState = {
  posts: {
    items: [],
    comments: [],
    status: "loading",
    statusComm: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    populatePosts(state) {
      state.posts.items = state.posts.items.sort((a, b) => {
        return a.viewsPost > b.viewsPost ? -1 : 1; //сортировка по количеству просмотров
      });
    },
    newPosts(state) {
      state.posts.items = state.posts.items.sort((a, b) => {
        return moment(b.createdAt) - moment(a.createdAt); //сортировка по времени
      });
    },
  },
  extraReducers: {
    //Получение статей
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //Удаление статьи
    [fetchDeletePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },

    [fetchComments.pending]: (state) => {
      state.posts.comments = [];
      state.posts.statusComm = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.posts.comments = action.payload;
      state.posts.statusComm = "loaded";
    },
    [fetchComments.rejected]: (state) => {
      state.posts.comments = [];
      state.posts.statusComm = "error";
    },
  },
});
export const { populatePosts, newPosts } = postsSlice.actions;
export const postsReduser = postsSlice.reducer;
