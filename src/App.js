import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import Profile from "./Profile/Profile";
import Bar from "./Bar/Bar";
import HomePage from "./HomePage/HomePage";
import { setUser, clearUser } from "./redux/userSlice";
import { SERVER } from "./config";
import { getCookie, deleteCookie } from "./cookieHelper";
import PostPage from "./PostPage/PostPage";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

export default function App() {
  const dispatch = useDispatch();

  const [channel, setChannel] = useState("findModel");
  const classes = useStyles();

  useEffect(async () => {
    const token = getCookie("token");
    try {
      const { data } = await SERVER.post("/authenticate", { token });
      dispatch(setUser(data));
    } catch {
      deleteCookie("token");
      dispatch(clearUser());
    }
  }, []);

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
          <PostPage />
        </Route>
        <Route exact path="/profile/:userID">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}
