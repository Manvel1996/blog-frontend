import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchPosts = createAsyncThunk('posts/fetchPosts',async()=>{
    const { data } = await axios.get('/posts')
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags',async()=>{
    const { data } = await axios.get('tags')
    return data
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost',async(id)=>{
    axios.delete(`/posts/${id}`)
})





const initialState = {
    posts: {
        items: [],
        status : "loading",
    },
    tags: {
        items: [],
        status : "loading",
    },
    comments:{
        items:[],
    }
}



const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPostComments:(state,action)=>{
            state.comments.items = 
             (action.payload.length > 5 ? action.payload.slice(0,5):action.payload)
        },
        sortPopularPosts:(state)=>{
            state.posts.items = state.posts.items.sort((a,b)=>{
                if (a.viewsCount > b.viewsCount) {
                    return -1;
                  }
                  if (a.viewsCount < b.viewsCount) {
                    return 1;
                  }
                  return 0;
            })
        },
        sortNewPosts:(state)=>{
            state.posts.items = state.posts.items.reverse()
        },
        sortTagsPosts:(state,action)=>{
            state.posts.items = state.posts.items
             .filter(post=>{
                if(post.tags.includes(action.payload)){
                    return true
                }
                else return false
             })
                
    
        }
    },
    extraReducers: {
        ///  get posts


        [fetchPosts.pending]:(state)=>{
            state.posts.items = [];
            state.posts.status = "loading"
        },
        [fetchPosts.fulfilled]:(state,action)=>{
            state.posts.items = action.payload
            state.posts.status = "loaded"
        },
        [fetchPosts.rejected]:(state)=>{
            state.posts.items = [];
            state.posts.status = "error"
        },


        // get tags

        [fetchTags.pending]:(state)=>{
            state.tags.items = [];
            state.tags.status = "loading"
        },
        [fetchTags.fulfilled]:(state,action)=>{
            state.tags.items = action.payload
            state.tags.status = "loaded"
        },
        [fetchTags.rejected]:(state)=>{
            state.tags.items = [];
            state.tags.status = "error"
        },


        // remove post


        [fetchRemovePost.fulfilled]:(state,action)=>{
            state.posts.items = state.posts.items.filter(obj=>obj._id !== action.meta.arg)
        },
    },

})


export const { sortPopularPosts, sortNewPosts, sortTagsPosts, addPostComments } = postSlice.actions;

export const postReducer = postSlice.reducer;