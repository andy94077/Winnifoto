import React, { useState, useEffect } from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";
import moment from "moment";
import { useParams } from "react-router-dom";

import Post from "../components/Post";
import UploadPost from "../Upload/UploadPost";
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
  post: {
    margin: "10px 0",
  },
}));

export default function HomePage(props) {
  const { channel } = props;
  const { searchKey } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  useEffect(async () => {
    try {
      const { data } = await SERVER.get("/post");
      setPosts(
        data.map((post) => ({
          ...post,
          time: post.time === "" ? "" : moment(post.time),
          createAt: moment(post.createAt),
        }))
      );
      setIsLoading(false);
    } catch (err) {
      console.log(err.response);
    }
  }, []);

  if (isLoading) return <CircularProgress />;

  return (
    <div className={classes.root}>
      <UploadPost channel={channel} />
      {posts
        .filter((post) => post.type === channel)
        .map((post) => (
          <Post key={post._id} className={classes.post} post={post} />
        ))}
    </div>
  );
}
