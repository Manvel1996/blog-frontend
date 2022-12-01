import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
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
      <List className={myTheme ? "darktheme":""}>
        {(isLoading ? [...Array(5)] : items).map((name) => (
          <span
            key={uuidv4()}
            onClick={()=>{
              dispatch(sortTagsPosts(name))
            }}
          >
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </span>
        ))}
      </List>
    </SideBlock>
  );
};
