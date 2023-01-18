import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import SendIcon from "@mui/icons-material/Send";
import logo from "../../assets/logo-twitter.png";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthYou, selectIsAuth } from "../../redux/slices/auth";
import { logout } from "../../redux/slices/auth";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, useForkRef } from "@mui/material";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  console.log(userData);
  const [isAuthData, setIsAuthData] = useState(false);

  const showAndCloseWindow = () => {
    setIsAuthData((isAuthData) => !isAuthData);
  };

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <img
              className={styles.logo__twitter}
              src={logo}
              alt="logo_twitter"
            />
            <div className={styles.logo__title}>TWITT BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <button
                  onClick={showAndCloseWindow}
                  className={styles.userMenu}
                >
                  <Avatar src={userData.avatar} alt={userData.fullName} />
                  <span>{userData.fullName.split(" ")[0]}</span>
                </button>
                {isAuthData && (
                  <div
                    className={styles.menu__wrapper}
                    onClick={showAndCloseWindow}
                  >
                    <div className={styles.menu__links}>
                      <CloseIcon className={styles.cross} />
                      <Link to="/post">
                        <button className={styles.link__posts}>
                          Написать статью
                        </button>
                      </Link>
                      <Link to="/you">
                        <button className={styles.link__acc}>
                          Мой аккаунт
                        </button>
                      </Link>
                      <button
                        className={styles.link__out}
                        onClick={onClickLogout}
                      >
                        Выйти
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="contained" endIcon={<SendIcon />}>
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained" color="secondary">
                    Создать аккаунт
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
