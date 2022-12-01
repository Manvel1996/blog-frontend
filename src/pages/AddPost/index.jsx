import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import axios from '../../axios';
import { Modal } from '../../modal/Modal';

export const AddPost = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const isAuth = useSelector(selectIsAuth)
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl,setImageUrl] = useState('')
  const inputFileRef = useRef(null)
  const isEditing = Boolean(id)


  const[active,setActive] = useState(false)
  


  const myTheme = useSelector(state=> state.theme)

 

  const handleChangeFile = async(e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0]
      formData.append('image',file)
      const { data } = await axios.post('/upload',formData)
      setImageUrl(data.url)
    } catch (error) {
      console.log(error)
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("")
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async()=>{
    if(title.trim().length > 1 && text.trim().length > 3){
      try {
      
        const fileds = {
          title,
          imageUrl,
          tags,
          text,
          comments:[]
        }
  
        const { data } = isEditing ?
          await axios.patch(`/posts/${id}`,fileds):
          await axios.post('/posts',fileds)
  
        const _id = isEditing ? id : data._id
  
        navigate(`/posts/${_id}`)
  
      } catch (error) {
        console.warn(error)
      }
    }
    else alert("please write Header and Text")
    
  }

  useEffect(()=>{
    if(id){
      axios.get(`/posts/${id}`)
      .then(({ data }) =>{
        setTitle(data.title)
        setText(data.text)
        setImageUrl(data.imageUrl)
        setTags(data.tags.join())
      }).catch(error=>{
        console.log(error)
        alert("Error can't get post")
      })
    }
  },[])


  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Write text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const modalContent = ()=>{
    return(
    <>
      <p>Are you sure?</p>
      <div>
          <button onClick={()=>{
            onSubmit()
            setActive(false)
          }}>Yes</button>
          <button onClick={()=>{
            setActive(false)
          }}>No</button>
      </div>
    </>
    )
  }

  if(!localStorage.getItem('token') && !isAuth){
    return <Navigate to="/" />
  }

  
 

  return (
    <Paper style={{ padding: 30 }} className={myTheme? "darktheme":""}>
      <Button onClick={()=> inputFileRef.current.click()} variant="outlined" size="large">
        Load preview
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
      <>
        <Button  variant="contained" color="error" onClick={onClickRemoveImage}>
          Delete
        </Button>
        <img className={styles.image} src={`mongodb+srv://Manvel:secret123@cluster0.aqc7djd.mongodb.net/?retryWrites=true&w=majority${imageUrl}`} alt="Uploaded" />
      </>
      )}
      <Modal active={active} setActive={setActive} children={modalContent()}/>
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Header post..."
        value={title}
        inputProps={{ maxLength: 20,minLength: 1 }}
        onChange={(e)=>setTitle(e.target.value)}
        fullWidth
      />
      <TextField
      title='Write example`  react, js, framwork'
       classes={{ root: styles.tags }}
        variant="standard" 
        placeholder="Tags" 
        value={tags}
        onChange={(e)=>setTags(e.target.value)}
        fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={()=>setActive(true)} size="large" variant="contained">
        {isEditing? "Save" : 'Publish' }
        </Button>
        <Button size="large" 
            onClick={()=>{
              setText("")
              setTitle("")
              setTags("")
              setImageUrl("")
            }}>
        Cancel</Button>
      </div>
    </Paper>
  );
};
