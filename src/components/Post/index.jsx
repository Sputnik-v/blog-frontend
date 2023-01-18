import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { transformDate } from "../../utils/transformDate";
import { useDispatch } from "react-redux";

import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";
import { fetchDeletePost } from "../../redux/slices/posts";
import { logout } from "../../redux/slices/auth";

export const Post = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  text,
  //tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
  author,
}) => {
  const dispatch = useDispatch();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить статью?")) {
      dispatch(fetchDeletePost(_id));
    }
  };
  const newDate = transformDate(createdAt);

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={newDate} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/post/${_id}`}>{title}</Link>}
          </h2>

          <Link className={styles.text} to={`/post/${_id}`}>
            {text.slice(0, 33).split(" ").slice(0, -1).join(" ") + " " + "..."}
          </Link>
          {/*<ul className={styles.tags}>*/}
          {/*  /!*{tags.map((name) => (*!/*/}
          {/*  /!*  <li key={name}>*!/*/}
          {/*  /!*    <Link to={`/tag/${name}`}>#{name}</Link>*!/*/}
          {/*  /!*  </li>*!/*/}
          {/*  /!*))}*!/*/}
          {/*</ul>*/}
          <p className={styles.author}>author: {author}</p>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
