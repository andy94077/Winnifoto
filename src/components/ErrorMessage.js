import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PhotoCameraOutlined } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    "& > svg": {
      borderRadius: "50%",
      border: "3px solid black",
      padding: 13,
      fontSize: "5em",
      margin: "20px 0",
    },
  },
  rootWithoutCircle: {
    textAlign: "center",
    "& > svg": {
      borderRadius: "50%",
      fontSize: "6em",
      margin: "20px 0",
    },
  },
});

export default function ErrorMessage(props) {
  const { msg, icon = <PhotoCameraOutlined />, circle = true } = props;
  const classes = useStyles();
  return (
    <div className={circle ? classes.root : classes.rootWithoutCircle}>
      {icon}
      <Typography variant="h4" style={{ fontWeight: 300 }}>
        {msg}
      </Typography>
    </div>
  );
}
