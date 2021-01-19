import React, { useState, useEffect } from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";
import moment from "moment";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Post from "../components/Post";
import UploadPost from "../Upload/UploadPost";
import { SERVER } from "../config";
import { selectUser } from "../redux/userSlice";

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
  const user = useSelector(selectUser);
  const { searchKey } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  const handleSetPost = (post) => {
    setPosts((pre) => {
      const newArray = [...pre];
      const i = newArray.findIndex((item) => item._id === post._id);
      newArray[i] = post;
      return newArray;
    });
  };

  useEffect(async () => {
    try {
      const { data } = await SERVER.get("/post");
      setPosts(
        data.map((post) => ({
          ...post,
          time: post.time === "" || post.time === null ? "" : moment(post.time),
          createdAt: moment(post.createdAt),
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
      {user._id !== null && <UploadPost channel={channel} />}
      {posts
        .filter((post) => post.type === channel)
        .map((post) => (
          <Post
            key={post._id}
            className={classes.post}
            post={post}
            // setPost={handleSetPost}
            setPosts={setPosts}
          />
        ))}
    </div>
  );
}
