import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { toast } from 'react-toastify';

export const Login = () => {

  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const { info } = useSelector(state=>state.auth)
  const myTheme = useSelector(state=>state.theme)

  useEffect(()=>{
    if(info){
      toast("wrong Login or Password")
    }
  },[info])

  const { register,handleSubmit,
    formState :{errors,isValid}} = useForm({
    defaultValues:{
      email: '',
      password:''
    },
    mode:"onChange",
  });

  const onSubmit = async(values)=>{
    const data = await dispatch(fetchAuth(values))


    if('token' in data.payload){
      window.localStorage.setItem('token',data.payload.token)
    }else alert("don't authorziation")
  }

 

  if(isAuth){
    return <Navigate to="/" />
  }

  return (
    <div className={myTheme ? "darktheme":""} style={{height:"100vh"}}>
      <Paper classes={{ root: styles.root }}  className={myTheme ? "darktheme":""}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Login account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            label="E-Mail"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            type='email'
            inputProps={{ maxLength: 22,minLength: 6 }}
            {...register('email',{required:'Please write Email'})}
            fullWidth
            />
          <TextField className={styles.field} label="Password"
            type="password"
            inputProps={{ maxLength: 32,minLength: 5 }}
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password',{required:'Please write Password'})}
            fullWidth />
          <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};
