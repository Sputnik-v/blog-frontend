import { configureStore } from "@reduxjs/toolkit";
import { postsReduser } from "./slices/posts";
import { userReducer } from "./slices/users";
import { oneUSerReducer } from "./slices/user";
import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: {
    posts: postsReduser,
    user: userReducer,
    oneUser: oneUSerReducer,
    auth: authReducer,
  },
});

export default store;
