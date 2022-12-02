import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";

export const CommentsBlock = ({ items, children, isLoading = true }) => {

  const myTheme = useSelector(state=> state.theme)

  return (
    <div className={myTheme? "darktheme":""} >
      <SideBlock title="Comment">
        <List >
          {isLoading ? [...Array(5)] : items?.map((obj) => (
            <React.Fragment key={uuidv4()}>
              <ListItem alignItems="flex-start" justifyContent="start">
                <ListItemAvatar className="commentAvatar">
                  {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar alt={obj.writer} src={""} />
                    )}
                </ListItemAvatar>
                {isLoading ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3><b>{obj.writer}</b></h3>
                    <div>{obj.text}</div>
                  </div>
                  )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
        {children}
      </SideBlock>
    </div>
  );
};
