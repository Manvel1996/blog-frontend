import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/PostSlice";
import { authReducer } from "./slices/auth";
import { themeReducer } from "./slices/Themeslice";


const store = configureStore({
    reducer:{
        posts: postReducer,
        auth: authReducer,
        theme: themeReducer
    }
})

export default store