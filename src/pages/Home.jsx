import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags, sortPopularPosts, sortNewPosts } from '../redux/slices/PostSlice';
import { v4 as uuidv4 } from 'uuid';

export const Home = () => {

  const[value,setValue] = useState(0)
  

  const dispatch = useDispatch()
  const userData = useSelector(state=>state.auth.data)
  const { posts, tags, comments } = useSelector(state=>state.posts)

  const isPostLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';



  useEffect(()=>{
    dispatch(fetchPosts())
    dispatch(fetchTags())
  },[dispatch])




  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={value} aria-label="basic tabs example">
        <Tab label="New/Old" onClick={()=>{
          dispatch(sortNewPosts())
          setValue(0)
          }}/>
        <Tab label="Popular" onClick={()=>{
          dispatch(sortPopularPosts())
          setValue(1)
          }}/>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading?[...Array(5)]:posts.items).map((obj) =>
            isPostLoading ?
            <Post key={uuidv4()} isLoading={true}/>:
            (
              <Post
                key={uuidv4()} 
                id={obj._id}
                title= {obj.title}
                imageUrl= {obj.imageUrl?`https://blog-backend-production-37d2.up.railway.app${obj.imageUrl}`:""}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                comments={obj.comments}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={comments.items}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
