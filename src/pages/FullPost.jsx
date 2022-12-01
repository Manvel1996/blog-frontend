import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import ReactMarkdown from "react-markdown";


export const FullPost = () => {

  const[data,setData] = useState({})
  const[isLoading,setIsLoading] = useState(true)
  const { id }  = useParams()
  
  useEffect(()=>{
    axios.get(`/posts/${id}`)
      .then(res=> {
        setData(res.data)
        setIsLoading(false)
      })
      .catch(error=>{
        console.log(error,"Eror in a get post")
      })
  },[id])

  if(isLoading){
    return <Post isLoading={isLoading} isFullPost/>
  }

  const addComent= (obj)=> {
    setData({
      ...data,
      comments:[...data.comments,obj]
    })
  }


  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl? `mongodb+srv://Manvel:secret123@cluster0.aqc7djd.mongodb.net/?retryWrites=true&w=majority${data.imageUrl}`: ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text}  />
        <p>{data.text}</p>
      </Post>
      <CommentsBlock 
        items={data.comments}
        isLoading={false}
      >
        <Index postId={data._id} addComent={addComent}/>
      </CommentsBlock>
    </>
  );
};
