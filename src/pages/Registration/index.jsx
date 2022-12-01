import React,{useEffect} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';





export const Registration = () => {

  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const { info } = useSelector(state=>state.auth)
  const myTheme = useSelector(state=>state.theme)

  useEffect(()=>{
    if(info){
      console.log(info)
      toast("Please write correct info")
    }
  },[info])

  const { register,handleSubmit,
    formState :{errors,isValid}} = useForm({
    defaultValues:{
      fullName: '',
      email: '',
      password:''
    },
    mode:"onChange",
  });



  const onSubmit = async (values)=>{
    const data = await dispatch(fetchRegister(values))


    if('token' in data.payload){
      window.localStorage.setItem('token',data.payload.token)
    }else alert("don't authorziation")
  }

  if(isAuth){
    return <Navigate to="/" />
  }

  return (
    <div  style={{height:"100vh"}}>
      <Paper classes={{ root: styles.root }} className={myTheme ? "darktheme":""}>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Typography classes={{ root: styles.title }} variant="h5">
            Create acaunt
          </Typography>
          <div className={styles.avatar}>
            <Avatar sx={{ width: 100, height: 100 }} />
          </div>
          <TextField className={styles.field} 
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            {...register('fullName',{required:'Please write Full name'})}
            label="Full name" 
            inputProps={{ maxLength: 22,minLength: 3 }}
          fullWidth />
          <TextField className={styles.field} 
            inputProps={{ maxLength: 22,minLength: 5 }}
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            type='email'
            {...register('email',{required:'Please write Email'})}
          label="E-Mail" fullWidth />
          <TextField className={styles.field}
          inputProps={{ maxLength: 22,minLength: 5 }} 
          error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password',{required:'Please write Password'})}
            type='password'
          label="Password" fullWidth />
          <Button size="large" variant="contained" 
            disabled={!isValid} type='submit' fullWidth>
              Register
          </Button>
        </form>
      </Paper>
    </div>
  );
};
