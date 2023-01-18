import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

import { fetchPosts } from "../redux/slices/posts";
import { populatePosts, newPosts } from "../redux/slices/posts";
import axios from "../axios";

export const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.posts.posts);
  const userData = useSelector((state) => state.auth.data);
  const [tab, setTab] = useState(0);
  const [dataComment, setDataComment] = useState([]);

  const isPostsLoading = status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    axios
      .get("/comments")
      .then((res) => {
        setDataComment(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const populateItemPosts = () => {
    setTab(1);
    dispatch(populatePosts());
  };
  const newItemPosts = () => {
    setTab(0);
    dispatch(newPosts());
  };

  const shuffle = (array) => {
    const newArray = array.sort(() => Math.random() - 0.5);
    return newArray.slice(0, 3);
  };

  const commentsCount = (id) => {
    const count = dataComment.filter((item) => item.post === id);
    return count.length;
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={tab}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" onClick={newItemPosts} />
        <Tab label="Популярные" onClick={populateItemPosts} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isPostsLoading
            ? [...Array(5)]
            : items.map((obj) =>
                isPostsLoading ? (
                  <Post key={obj._id} isLoading={true} />
                ) : (
                  <Post
                    key={obj._id}
                    _id={obj._id}
                    title={obj.title}
                    imageUrl={obj.image}
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsPost}
                    commentsCount={commentsCount(obj._id)}
                    tags={["react", "fun", "typescript"]}
                    author={obj.author}
                    text={obj.text}
                    //isLoading={true}

                    isEditable={userData?._id === obj.user._id}
                  />
                )
              )}
        </Grid>
        <Grid xs={4} item>
          <div style={{ position: "sticky", top: "85px" }}>
            <TagsBlock />
            <CommentsBlock items={shuffle(dataComment)} isLoading={false} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
