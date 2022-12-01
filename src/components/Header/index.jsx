import React,{ useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { fetchPosts } from '../../redux/slices/PostSlice';
import { changThemeReducer } from "../../redux/slices/Themeslice"
import { Modal } from '../../modal/Modal.js';


export const Header = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const[active,setActive] = useState(false)

  const myTheme = useSelector(state=> state.theme)

  

  const modalContent = ()=>{
    return(
    <>
      <p>Are you sure you want to log out?</p>
      <div>
          <button onClick={()=>{
            setActive(false)
            dispatch(logout())
            localStorage.removeItem("token")
            localStorage.removeItem("BeginnersBlogThem")
          }}>Logout</button>
          <button onClick={()=>{
            setActive(false)
          }}>Cancel</button>
      </div>
    </>
    )
  }

 


  return (
    <div className={myTheme ? `${styles.root} darktheme`:`${styles.root}`}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div onClick={()=>dispatch(fetchPosts())
            }>IT begiiners BLOG</div>
          </Link>
          
          
          <button className={styles.themButton}  
            onClick={(e)=>dispatch(changThemeReducer(e.target.innerText))}>
              {myTheme? "Light Theme":"Dark Theme"}
          </button>
          
         
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained"  >Create Post</Button>
                </Link>
                <Button  onClick={()=>setActive(true)} variant="contained" color="error">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
      <Modal active={active} setActive={setActive} children={modalContent()}/>
    </div>
  );
};
