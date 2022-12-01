import React, { useState } from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';



import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { useDispatch,  useSelector } from 'react-redux';
import { fetchRemovePost, sortTagsPosts, addPostComments } from '../../redux/slices/PostSlice';
import { Modal } from '../../modal/Modal.js';




export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  comments,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {

  const dispatch = useDispatch();

  const[active,setActive] = useState(false)
  

  const myTheme = useSelector(state=> state.theme)
 
  
  if (isLoading) {
    return <PostSkeleton />;
  }


  const modalContent = ()=>{
    return(
    <>
      <p>Are you sure?</p>
      <div>
          <button onClick={()=>{
            dispatch(fetchRemovePost(id))
            setActive(false)
          }}>Delete</button>
          <button onClick={()=>{
            setActive(false)
          }}>Cancel</button>
      </div>
    </>
    )
  }
  
  

  return (
    <div 
      className={myTheme? `${clsx(styles.root,
      { [styles.rootFull]: isFullPost })} darktheme` :
        clsx(styles.root,
        { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={()=>
              setActive(true)
            } color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <Modal active={active} setActive={setActive} children={modalContent()}/> 
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={myTheme? `${styles.wrapper} darktheme`:styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={uuidv4()}>
                <a style={{ textDecoration: "none",cursor:"pointer"}} onClick={()=>{
                  dispatch(sortTagsPosts(name))
                }}>#{name}</a>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li style={{cursor:"pointer"}} onClick={()=>
                dispatch(addPostComments(comments))
              }>
              <CommentIcon />
              <span>{comments ? comments.length : 0}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
