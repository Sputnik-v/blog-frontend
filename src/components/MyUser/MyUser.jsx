import React, { useEffect, useState } from "react";
import styles from "./MyUser.module.scss";
import axios from "../../axios";

const MyUser = () => {
  const [data, setData] = useState({});
  const [isPush, setIsPush] = useState(false);

  const handleAcc = async () => {
    const { data } = await axios.post("/you");
    setData(data);
  };

  const handleChangeAvatar = (e) => {
    setData((prevstate) => ({ ...prevstate, avatar: e.target.value }));
  };
  const handleChangeFullName = (e) => {
    setData((prevstate) => ({ ...prevstate, fullName: e.target.value }));
  };
  const handleChangeEmail = (e) => {
    setData((prevstate) => ({ ...prevstate, email: e.target.value }));
  };

  const pushData = async () => {
    await axios.patch("/you/update", data);
    setIsPush(true);
    const timeout = setTimeout(() => {
      setIsPush(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  };

  useEffect(() => {
    handleAcc();
  }, []);
  return (
    <div className={styles.wrapper}>
      <p className={styles.wrapper__created}>обновлено {data.updatedAt}</p>
      <div className={styles.container}>
        <img
          src={data.avatar}
          alt={data.avatar}
          className={styles.container__img}
        />
        <input
          type="text"
          name="avatar"
          value={data.avatar}
          onChange={(e) => handleChangeAvatar(e)}
        />
        <input
          type="text"
          name="fullName"
          value={data.fullName}
          onChange={(e) => handleChangeFullName(e)}
        />
        <input
          type="text"
          name="email"
          value={data.email}
          onChange={(e) => handleChangeEmail(e)}
        />
      </div>
      <button onClick={pushData}>Изменить</button>
      {isPush && <h3>Вы обновили данные!</h3>}
    </div>
  );
};

export default MyUser;
