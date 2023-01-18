import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from "./SideBlock";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/slices/users";
import Avatar from "@mui/material/Avatar";
import { randomUsers } from "../redux/slices/users";

export const TagsBlock = () => {
  const dispatch = useDispatch();
  const { status, randomUser } = useSelector((state) => state.user);

  const isUserLoading = status === "loading";

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <SideBlock title="Случайный пользователь">
      <List>
        {isUserLoading
          ? [...Array(1)]
          : randomUser.map((item) => (
              <Link
                key={item._id}
                style={{ textDecoration: "none", color: "black" }}
                to={`/users/${item._id}`}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <Avatar
                      alt={item.fullName}
                      src={item.avatar}
                      style={{ marginRight: "20px" }}
                    />

                    {isUserLoading ? (
                      <Skeleton width={100} />
                    ) : (
                      <ListItemText primary={item.fullName} />
                    )}
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
      </List>
      <img
        className="random-img"
        src="random.png"
        alt="random"
        onClick={() => dispatch(randomUsers())}
      />
      <Link to="/users" className="our-users">
        <span>our users</span>
      </Link>
    </SideBlock>
  );
};
