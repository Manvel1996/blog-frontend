import React from "react";

import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import { useDispatch, useSelector } from "react-redux";
import { sortTagsPosts } from '../redux/slices/PostSlice'
import { v4 as uuidv4 } from 'uuid';


export const TagsBlock = ({ items, isLoading = true }) => {

  const dispatch = useDispatch()
  const myTheme = useSelector(state=>state.theme)

  return (
    <SideBlock title="Tags"  >
      <div className={myTheme ? "darktheme":""}>
        {(isLoading ? [...Array(5)] : items).map((name) => (
          <button
            style={{border:"none",display:"block", marginBottom:"5px", width:"100%",cursor:"pointer"}}
            key={uuidv4()}
            onClick={()=>{
              dispatch(sortTagsPosts(name))
            }}
          >
            {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <h3># {name}</h3>
                )
            }
          </button>
        ))}
      </div>
    </SideBlock>
  );
};
