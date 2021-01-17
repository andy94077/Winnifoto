import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useSelector } from "react-redux";
import Profile from "./Profile/Profile";
import Bar from "./Bar/Bar";
import Post from "./components/Post";
import HomePage from "./HomePage/HomePage";
import { selectUser } from "./redux/userSlice";

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
  const [channel, setChannel] = useState("findModel");
  const user = useSelector(selectUser);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Bar channel={channel} setChannel={setChannel} />
      <HomePage channel={channel} />
      {/* <Profile /> */}
    </div>
  );
}
