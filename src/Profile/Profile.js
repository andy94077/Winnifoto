import React from "react";
import { makeStyles, Avatar, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import moment from "moment";

import PostGrid from "../components/PostGrid";
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
  const user = useSelector(selectUser);
  const classes = useStyles();

  const posts = [
    {
      id: 123,
      img: "/imgs/w.jpg",
      time: moment().add(3, "days"),
      location: "Taipei",
      styles: ["style1", "style2"],
      likesNum: 3,
      commentsNum: 10,
      body: "This is the body.",
      user,
      createAt: moment().subtract(3, "days"),
    },
    {
      id: 789,
      img: "/imgs/i.jpg",
      time: moment().add(1, "days").subtract(40, "minutes"),
      location: "Tainan",
      styles: ["style1", "style2"],
      likesNum: 3,
      commentsNum: 10,
      body: "This is the body.",
      user,
      createAt: moment().subtract(3, "days").add(5, "minutes"),
    },
    {
      id: 0,
      img: "/imgs/n.jpg",
      time: moment().add(2, "days"),
      location: "Penghu",
      styles: ["style1", "style2"],
      likesNum: 3,
      commentsNum: 10,
      body: "This is the body.",
      user,
      createAt: moment().subtract(3, "days"),
    },
    {
      id: 1,
      img: "/imgs/n2.jpg",
      time: moment().add(3, "days"),
      location: "Taipei",
      styles: ["style1", "style2"],
      likesNum: 3,
      commentsNum: 10,
      body: "This is the body.",
      user,
      createAt: moment().subtract(3, "days"),
    },
    {
      id: 2,
      img: "/imgs/i2.jpg",
      time: moment().add(3, "days"),
      location: "Taipei",
      styles: ["style1", "style2"],
      likesNum: 3,
      commentsNum: 10,
      body: "This is the body.",
      user,
      createAt: moment().subtract(3, "days"),
    },
    {
      id: 3,
      img: "/imgs/f.jpg",
      time: moment().add(3, "days"),
      location: "Taipei",
      styles: ["style1", "style2"],
      likesNum: 3,
      commentsNum: 10,
      body: "This is the body.",
      user,
      createAt: moment().subtract(3, "days"),
    },
    {
      id: 4,
      img: "/imgs/o.jpg",
      time: moment().add(3, "days"),
      location: "Taipei",
      styles: ["style1", "style2"],
      likesNum: 3,
      commentsNum: 10,
      body: "This is the body.",
      user,
      createAt: moment().subtract(3, "days"),
    },
    {
      id: 5,
      img: "/imgs/t.jpg",
      time: moment().add(3, "days"),
      location: "Taipei",
      styles: ["style1", "style2"],
      likesNum: 3,
      commentsNum: 10,
      body: "This is the body.",
      user,
      createAt: moment().subtract(3, "days"),
    },
    {
      id: 6,
      img: "/imgs/o2.jpg",
      time: moment().add(3, "days"),
      location: "Taipei",
      styles: ["style1", "style2"],
      likesNum: 3,
      commentsNum: 10,
      body: "This is the body.",
      user,
      createAt: moment().subtract(3, "days"),
    },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Avatar alt={user.name} src={user.img} className={classes.avatar} />
        <div style={{ marginTop: 10 }}>
          <Typography variant="h2" gutterBottom className={classes.username}>
            {user.name}
          </Typography>
        </div>
      </div>
      <div className={classes.divider} />
      <PostGrid posts={posts} />
    </div>
  );
}
