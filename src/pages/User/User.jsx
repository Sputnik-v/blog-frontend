import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneUser } from "../../redux/slices/user";
import { useParams } from "react-router-dom";
import { transformDate } from "../../utils/transformDate";
import { PostSkeleton } from "../../components/Post/Skeleton";
import style from "./User.module.scss";
import { fetchPosts } from "../../redux/slices/posts";
import { Post } from "../../components";

const User = () => {
  const dispatch = useDispatch();
  const { oneUser, status } = useSelector((state) => state.oneUser);
  const { items } = useSelector((state) => state.posts.posts);

  const { id } = useParams();

  const itemsUser = items.filter((item) => item.user._id === id);

  useEffect(() => {
    dispatch(fetchOneUser(id));
    dispatch(fetchPosts());
  }, []);

  const { avatar, email, name, createAccount, updateAccount } = oneUser;

  const isUserLoading = status === "loading";

  if (isUserLoading) {
    return <PostSkeleton />;
  }

  const createAccountDate = transformDate(createAccount);
  const updateAccountDate = transformDate(updateAccount);

  return (
    <div className="op">
      {isUserLoading ? (
        <div>...loading</div>
      ) : (
        <div className={style.container__ls}>
          <div className={style.about}>
            <a href="#">
              <img className={style.about__avatar} src={avatar} alt={name} />
            </a>
            <a href="#" className={style.about__message}>
              <button className={style.about__message_btn}>
                message write
              </button>
            </a>
            <div className={style.about__description}>
              <p className={style.about__description_name}>{name}</p>
              <p className={style.about__description_email}>
                <span className={style.span}>mail: </span>
                {email}
              </p>
              <p className={style.about__description_create}>
                <span className={style.span}>account create: </span>
                {createAccountDate}
              </p>
              <p className={style.about__description_update}>
                <span className={style.span}>account update: </span>
                {updateAccountDate}
              </p>
            </div>
          </div>
          <div className={style.posts}>
            <h2 className={style.posts__title}>My Posts</h2>
            {itemsUser.map((item) => {
              return (
                <Post
                  _id={item._id}
                  title={item.title}
                  imageUrl={item.image}
                  user={item.user}
                  createdAt={item.createdAt}
                  viewsCount={item.viewsPost}
                  isFullPost={true}
                  text={item.text}
                  author={item.author}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
