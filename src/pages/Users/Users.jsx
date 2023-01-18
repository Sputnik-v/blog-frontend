import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/slices/users";

import UserItem from "./UserItem/UserItem";
import { PostSkeleton } from "../../components/Post/Skeleton";

import style from "./Users.module.scss";

const Users = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.user);

  const isUsersLoading = status === "loading";

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (isUsersLoading) {
    return <PostSkeleton />;
  }

  return (
    <div className={style.users}>
      <h2 className={style.users__title}>This our users</h2>
      <div>
        {users.map((user) => {
          return (
            <UserItem
              key={user._id}
              avatar={user.avatar}
              fullName={user.fullName}
              createdAt={user.createdAt}
              _id={user._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Users;
