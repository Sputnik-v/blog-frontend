import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../redux/slices/posts";

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { comments, statusComm } = useSelector((state) => state.posts.posts);

  const { id } = useParams();

  useEffect(() => {
    newFetchComments();
  }, []);

  const newFetchComments = () => {
    dispatch(fetchComments(id));
  };

  useEffect(() => {
    axios
      .get(`/post/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      <Post
        _id={id}
        title={data.title}
        imageUrl={data.image}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsPost}
        commentsCount={comments.length}
        isFullPost
        text={data.text}
        author={data.author}
      >
        <ReactMarkdown children={data.text} />
        {/*<p>{data.text}</p>*/}
      </Post>
      <CommentsBlock items={comments} isLoading={false}>
        <Index id={id} newFetchComments={newFetchComments} />
      </CommentsBlock>
    </>
  );
};
