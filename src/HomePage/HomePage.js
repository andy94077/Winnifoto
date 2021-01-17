import React from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";

import { selectUser } from "../redux/userSlice";
import Post from "../components/Post";

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
  const user = useSelector(selectUser);
  const classes = useStyles();

  const posts = [
    {
      id: 123,
      images: ["/images/w.jpg"],
      type: "findModel",
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
      images: ["/images/i.jpg", "/images/i-2.jpg", "/images/i2.jpg"],
      type: "findSnapper",
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
      images: ["/images/n.jpg"],
      type: "findSnapper",
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
      images: ["/images/n2.jpg"],
      type: "findModel",
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
      images: ["/images/i2.jpg"],
      type: "findModel",
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
      images: ["/images/f.jpg"],
      type: "findModel",
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
      images: ["/images/o.jpg"],
      type: "findSnapper",
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
      images: ["/images/t.jpg"],
      type: "findSnapper",
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
      images: ["/images/o2.jpg"],
      type: "findModel",
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
      {posts
        .filter((post) => post.type === channel)
        .map((post) => (
          <Post key={post.id} className={classes.post} post={post} />
        ))}
    </div>
  );
}
