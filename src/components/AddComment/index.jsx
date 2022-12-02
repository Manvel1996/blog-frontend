import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import axios from "../../axios";
import { selectIsAuth } from "../../redux/slices/auth";




export const Index = ({postId,addComent}) => {
  const[commentText,setCommentText] = useState("")

  const  userData  = useSelector(state=>state.auth.data)
  
  const isAuth = useSelector(selectIsAuth)

  const onSubmit = async()=>{
    if(commentText.trim().length === 0){
      return toast("Please write comment")
    }
    if(!isAuth){
      return toast("Please sign in to add a comment")
    }

    try {
      const variables = {
        text: commentText,
        writer: userData.fullName,
        postId,
      }

      await axios.patch(`saveComment/${postId}`,variables)

      setCommentText("")

      addComent(variables)
     

    } catch (error) {
      toast("Sorry your comment don't aded")
    }
  }




  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
        />
        <div className={styles.form}>
          <TextField
            className="commentInput"
            label="Write Comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            inputProps={{ maxLength: 200 }}
            value={commentText}
            onChange={(e)=>setCommentText(e.target.value)}
          />
          <Button onClick={onSubmit} variant="contained">Submit</Button>
        </div>
      </div>
    </>
  );
};
