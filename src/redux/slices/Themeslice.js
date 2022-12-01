import { createSlice } from "@reduxjs/toolkit";


const themeSlice = createSlice({
    name:'theme',
    initialState:(localStorage.getItem("BeginnersBlogThem")? true:false),
    reducers:{
        changThemeReducer:(state,action)=>{
            if(action.payload === "Dark Theme"){
                localStorage.setItem("BeginnersBlogThem",true)
                return state = true
              }
              else{
                localStorage.removeItem("BeginnersBlogThem")
                return state = false  
            }
        }
    }
})


export const { changThemeReducer } = themeSlice.actions


export const themeReducer = themeSlice.reducer;