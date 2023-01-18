import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Login.module.scss";
import { fetchLogin, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      passwordHash: "",
    },
    mode: "onChange",
  });

  const isAuth = useSelector(selectIsAuth);

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));
    if (!data.payload) {
      alert("Не удалось авторизоваться!");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          type="password"
          fullWidth
          error={Boolean(errors.passwordHash?.message)}
          helperText={errors.passwordHash?.message}
          {...register("passwordHash", { required: "Укажите пароль" })}
        />
        <Button size="large" variant="contained" fullWidth type="submit">
          Войти
        </Button>
      </form>
    </Paper>
  );
};
