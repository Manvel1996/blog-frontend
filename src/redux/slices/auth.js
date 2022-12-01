import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchAuth = createAsyncThunk('auth/fetchUserData',async(params)=>{
    const { data } = await axios.post('/auth/login',params)
    return data
})


export const fetchRegister = createAsyncThunk('auth/fetchRegister',async(params)=>{
    const { data } = await axios.post('/auth/register',params)
    return data
})


export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe',async()=>{
    const { data } = await axios.get('/auth/me')
    return data
})






const initialState = {
  data:null,
  status:'loading',
  info: null,
}



const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.data = null;
        }
    },
    extraReducers: {


        // Login

        [fetchAuth.pending]:(state)=>{
            state.status = "loading";
            state.data = null;
            state.info = null;
        },
        [fetchAuth.fulfilled]:(state,action)=>{
            state.status = "loaded";
            state.data = action.payload;
            state.info = null;
        },
        [fetchAuth.rejected]:(state,action)=>{
            state.status = "error";
            state.data = null;
            state.info = action.error.message
        },


        // Auth me

        [fetchAuthMe.pending]:(state)=>{
            state.status = "loading";
            state.data = null;
            state.info = null;
        },
        [fetchAuthMe.fulfilled]:(state,action)=>{
            state.status = "loaded";
            state.data = action.payload;
            state.info = null;
        },
        [fetchAuthMe.rejected]:(state,action)=>{
            state.status = "error";
            state.data = null;
        },


        // Register

        [fetchRegister.pending]:(state)=>{
            state.status = "loading";
            state.data = null;
            state.info = null;
        },
        [fetchRegister.fulfilled]:(state,action)=>{
            state.status = "loaded";
            state.data = action.payload;
            state.info = null;
        },
        [fetchRegister.rejected]:(state,action)=>{
            state.status = "error";
            state.data = null;
            state.info = action.error.message
        },
    }
})

export const selectIsAuth = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions