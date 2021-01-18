import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile/Profile";
import Bar from "./Bar/Bar";
import Post from "./components/Post";
import HomePage from "./HomePage/HomePage";
import { selectUser, setUser } from "./redux/userSlice";
import { SERVER } from "./config";
import { getCookie, deleteCookie } from "./cookieHelper";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [channel, setChannel] = useState("findModel");
  const user = useSelector(selectUser);
  const classes = useStyles();

  useEffect(async () => {
    const token = getCookie("token");
    try {
      const { data } = await SERVER.post("/authenticate", { token });
      dispatch(setUser(data));
    } catch {
      deleteCookie("token");
    }
  }, []);

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
        <Route exact path="/post/:postID">
          <Post />
        </Route>
        <Route exact path="/profile/:userID">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}
