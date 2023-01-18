import React from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { transformDate } from "../../../utils/transformDate";
import style from "./UserItem.module.scss";

const UserItem = ({ avatar, fullName, createdAt, _id }) => {
  return (
    <Link to={`/users/${_id}`} className={style.user}>
      <Avatar src={avatar} alt={avatar} className={style.user__avatar} />
      <p className={style.user__name}>{fullName}</p>
      <p className={style.user__create}>{transformDate(createdAt)}</p>
    </Link>
  );
};

export default UserItem;
