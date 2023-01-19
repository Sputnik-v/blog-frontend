import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";

export const Index = ({ id, newFetchComments }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  const [state, setState] = useState("");

  const writeComm = (e) => {
    setState(e.target.value);
  };

  const pushComment = async () => {
    await axios.post("/comment", {
      comm: state,
      id: id,
    });
    setState("");
    newFetchComments();
  };
  console.log(userData);
  return (
    <>
      <div className={styles.root}>
        {userData ? (
          <>
            <Avatar classes={{ root: styles.avatar }} src={userData.avatar} />
            <div className={styles.form}>
              <TextField
                label="Написать комментарий"
                variant="outlined"
                maxRows={10}
                multiline
                fullWidth
                value={state}
                onChange={(e) => writeComm(e)}
              />
              <Button variant="contained" onClick={pushComment}>
                Отправить
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
