import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Avatar,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";
import { useParams } from "react-router-dom";

import PostGrid from "../components/PostGrid";
import CONCAT_SERVER_URL from "../utils";
import { SERVER } from "../config";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "70%",
    maxWidth: 780,
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  avatar: {
    height: 150,
    width: 150,
    margin: "0 50px 30px 30px",
    [theme.breakpoints.down("sm")]: {
      height: 130,
      width: 130,
      margin: "0 35px 25px 20px",
    },
    [theme.breakpoints.down("xs")]: {
      height: 80,
      width: 80,
      margin: "0 25px 10px 15px",
    },
  },
  header: {
    display: "flex",
    paddingTop: 30,
  },
  username: {
    fontSize: 40,
    [theme.breakpoints.down("sm")]: {
      fontSize: 35,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
  divider: {
    border: "1px solid #ddd",
    margin: "10px 0 8px",
  },
}));

export default function Profile() {
  const { userID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [profileUser, setProfileUser] = useState({
    id: null,
    name: "",
    avatarUri: "",
    posts: [],
  }); // { id: 0, name: "Yueh", avatarUri: "/images/y.jpg" };
  // const user = useSelector(selectUser);
  const classes = useStyles();

  useEffect(async () => {
    if (userID === undefined || userID === null) return;
    try {
      const { data } = await SERVER.get("/user", { params: { userID } });
      setProfileUser({
        ...data,
        posts: data.posts.map((post) => ({
          ...post,
          likesNum: Object.keys(post.likes).length,
          commentsNum: post.comments.length,
          time: post.time === "" ? "" : moment(post.time),
          user: { _id: post.user, name: data.name, avatarUri: data.avatarUri },
          createAt: moment(post.createAt),
        })),
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err.response);
    }
  }, [userID]);

  if (isLoading) return <CircularProgress />;
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Avatar
          alt={profileUser.name}
          src={CONCAT_SERVER_URL(profileUser.avatarUri)}
          className={classes.avatar}
        />
        <div style={{ marginTop: 10 }}>
          <Typography variant="h2" gutterBottom className={classes.username}>
            {profileUser.name}
          </Typography>
        </div>
      </div>
      <div className={classes.divider} />
      <PostGrid posts={profileUser.posts} />
    </div>
  );
}
