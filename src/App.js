import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "./Profile/Profile";

const useStyles = makeStyles({
  root: { display: "flex", justifyContent: "center" },
});

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Profile />
    </div>
  );
}
