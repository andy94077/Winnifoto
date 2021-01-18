import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, useLocation } from "react-router-dom";

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
  const location = useLocation();

  const [channel, setChannel] = useState("findModel");
  const user = useSelector(selectUser);
  const classes = useStyles();

  console.log("user", user);
  return (
    <div className={classes.root}>
      <Bar channel={channel} setChannel={setChannel} />
      <Switch>
        <Route exact path="/">
          <HomePage channel={channel} />
        </Route>
        <Route exact path="/home/:searchKey">
          <HomePage channel={channel} />
        </Route>
        <Route exact path="/post/:postId">
          <Post />
        </Route>
        <Route exact path="/profile/:userId">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}
