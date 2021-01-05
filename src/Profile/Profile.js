import React from "react";
import { makeStyles, Avatar, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import PostGrid from "../components/PostGrid";
import { selectUser } from "../redux/userSlice";

const useStyles = makeStyles({
  root: { display: "flex", justifyContent: "center", flexDirection: "column" },
  avatar: {
    height: 150,
    width: 150,
    margin: "0 50px 30px 30px",
  },
  header: {
    display: "flex",
    paddingTop: 30,
  },
  divider: {
    border: "1px solid #ddd",
    margin: "10px 0",
  },
});

const posts = [
  {
    img: "/imgs/w.jpg",
    title: "hello",
    likesNum: 3,
    commentsNum: 10,
  },
  {
    img: "/imgs/i.jpg",
    title: "hello",
    likesNum: 3,
    commentsNum: 10,
  },
  {
    img: "/imgs/n.jpg",
    title: "hello",
    likesNum: 3,
    commentsNum: 10,
  },
  {
    img: "/imgs/n2.jpg",
    title: "hello",
    likesNum: 3,
    commentsNum: 10,
  },
  {
    img: "/imgs/i2.jpg",
    title: "hello",
    likesNum: 3,
    commentsNum: 10,
  },
  {
    img: "/imgs/f.jpg",
    title: "hello",
    likesNum: 3,
    commentsNum: 10,
  },
  {
    img: "/imgs/o.jpg",
    title: "hello",
    likesNum: 3,
    commentsNum: 10,
  },
  {
    img: "/imgs/t.jpg",
    title: "hello",
    likesNum: 3,
    commentsNum: 10,
  },
  {
    img: "/imgs/o2.jpg",
    title: "hello",
    likesNum: 3,
    commentsNum: 10,
  },
];

export default function Profile() {
  const user = useSelector(selectUser);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Avatar alt={user.name} src="/imgs/r.jpg" className={classes.avatar} />
        <div style={{ marginTop: 10 }}>
          <Typography variant="h2" gutterBottom style={{ fontSize: 40 }}>
            {user.name}
          </Typography>
        </div>
      </div>
      <div className={classes.divider} />
      <PostGrid posts={posts} />
    </div>
  );
}
