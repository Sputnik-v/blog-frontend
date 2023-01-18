import React from "react";
import styles from "./SideBlock.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export const SideBlock = ({ title, children, RandomUsers }) => {
  return (
    <Paper
      classes={{ root: styles.root }}
      style={{ border: "1px solid gray", position: "relative" }}
    >
      <Typography
        onClick={RandomUsers}
        variant="h6"
        classes={{ root: styles.title }}
        style={{ cursor: "pointer" }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
