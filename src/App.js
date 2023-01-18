import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import User from "./pages/User/User";
import Users from "./pages/Users/Users";
import { useEffect } from "react";
import { fetchAuthYou, selectIsAuth } from "./redux/slices/auth";
import MyUser from "./components/MyUser/MyUser";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthYou());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/you" element={<MyUser />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
