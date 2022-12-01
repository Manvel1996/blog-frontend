import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


import './index.scss'
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/auth";
import { ToastContainer } from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const dispatch = useDispatch()
  const myTheme = useSelector(state=>state.theme)
  

  useEffect(()=>{
    dispatch(fetchAuthMe())
  },[dispatch])




  return (
    <div className={myTheme? "app darktheme":"app"}>
      <Header />
      <Container maxWidth="lg" className={myTheme && "darktheme"}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts/:id" element={<FullPost />}/>
          <Route path="/posts/:id/edit" element={<AddPost />}/>
          <Route path="/add-post" element={ <AddPost />}/>
          <Route path="/login" element={ <Login /> }/>
          <Route path="/register" element={ <Registration />}/>
        </Routes>
      </Container>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
