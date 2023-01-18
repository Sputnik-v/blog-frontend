import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [image, setImage] = React.useState("");

  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImage(data.url);
    } catch (e) {
      console.warn(e);
      alert("Ошибка при загрузке файлов!");
    }
  };

  const onClickRemoveImage = () => {
    setImage("");
  };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const fields = {
        title,
        image: image ? image : `http://localhost:3001${image}`,
        author,
        text: value,
      };

      const { data } = isEditing
        ? await axios.patch(`/post/${id}`, fields)
        : await axios.post("/post", fields);

      const _id = isEditing ? id : data._id;
      navigate(`/post/${_id}`);
    } catch (e) {
      console.warn(e);
      alert("Ошибка при создании статьи!");
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/post/${id}`).then(({ data }) => {
        setTitle(data.title);
        setValue(data.text);
        setImage(data.image);
        setAuthor(data.author);
      });
    }
  }, [id]);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {image && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={image ? image : `http://localhost:3001${image}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Автор"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
