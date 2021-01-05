import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "./Profile/Profile";
import Bar from "./Bar/Bar";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Bar />
      <Profile />
    </div>
  );
}
