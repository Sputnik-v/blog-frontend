import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatar, fullName, _id, additionalText }) => {
  return (
    <Link to={`/users/${_id}`} className={styles.root}>
      <img
        className={styles.avatar}
        src={avatar || "/noavatar.png"}
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </Link>
  );
};
