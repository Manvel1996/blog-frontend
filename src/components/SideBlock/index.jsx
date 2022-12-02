import React from "react";
import styles from "./SideBlock.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

export const SideBlock = ({ title, children }) => {

  const myTheme = useSelector(state=>state.theme)

  return (
    <Paper  className={myTheme? "darktheme":""} id={styles.sideBlock} style={{wordWrap: "break-word"}}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
