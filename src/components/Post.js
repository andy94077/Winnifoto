import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Chip,
  Typography,
  Avatar,
  CardHeader,
  CardActions,
  IconButton,
  TextField,
} from "@material-ui/core";
import { AccessTime, Place, Favorite, SendRounded } from "@material-ui/icons";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "../redux/userSlice";
import CardImages from "./CardImages";
import CONCAT_SERVER_URL from "../utils";
import { SERVER } from "../config";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: "56.25%",
    width: "100%",
    height: 0,
    maxWidth: 800,
    minWidth: 400,
    margin: "20px 0",
  },
  card: {
    display: "flex",
    width: "100%",
    height: "100%",
    maxHeight: 550,
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 10,
  },
  header: { paddingBottom: 4 },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  content: { paddingTop: 10 },
  cover: { flex: 1 },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  tag: {
    display: "flex",
    alignItems: "center",
    marginBottom: 5,
  },
  chip: { margin: "5px 3px 0 0", height: 30 },
  link: { textDecoration: "none", color: "black" },
  action: {
    marginTop: "auto",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  commentBlock: { display: "flex", alignItems: "center", width: "100%" },
  input: { height: 40, flex: 1 },
  inputInput: { borderRadius: 15, height: "100%" },
  inputFieldset: {
    borderWidth: "1px !important",
    borderColor: "black !important",
  },
}));

export default function Post(props) {
  const {
    post,
    setPosts,
    className = "",
    classes: classesParam = { root: "", card: "" },
  } = props;
  const location = useLocation();
  const classes = useStyles();
  const user = useSelector(selectUser);

  const handleLike = async () => {
    try {
      const { data } = await SERVER.put("/post/like", {
        user: user._id,
        token: user.token,
        postID: post._id,
      });
      setPosts((pre) => {
        const newArray = [...pre];
        const i = newArray.findIndex((item) => item._id === data._id);
        newArray[i] = {
          ...data,
          time: data.time === "" || data.time === null ? "" : moment(data.time),
          createAt: moment(data.createAt),
        };
        return newArray;
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`${classes.root} ${className} ${classesParam.root}`}>
      <Card className={`${classes.card} ${classesParam.card}`}>
        <CardImages images={post.images} />
        <div className={classes.details}>
          <CardHeader
            className={classes.header}
            avatar={
              location.pathname === `/profile/${post.user._id}` ? (
                <Avatar
                  alt={post.user.name}
                  src={CONCAT_SERVER_URL(post.user.avatarUri)}
                />
              ) : (
                <Link to={`/profile/${post.user._id}`} className={classes.link}>
                  <Avatar
                    alt={post.user.name}
                    src={CONCAT_SERVER_URL(post.user.avatarUri)}
                  />
                </Link>
              )
            }
            title={
              location.pathname === `/profile/${post.user._id}` ? (
                post.user.name
              ) : (
                <Link
                  className={classes.link}
                  to={`/profile/${post.user._id}`}
                  style={{ textDecoration: "none" }}
                >
                  {post.user.name}
                </Link>
              )
            }
            subheader={
              location.pathname === `/profile/${post._id}` ? (
                post.createAt - moment().subtract(5, "days") ? (
                  post.createAt.calendar()
                ) : (
                  post.createAt.fromNow()
                )
              ) : (
                <Link to={`/post/${post._id}`} className={classes.link}>
                  {post.createAt - moment().subtract(5, "days")
                    ? post.createAt.calendar()
                    : post.createAt.fromNow()}
                </Link>
              )
            }
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ margin: "10px 0 0 13px" }}>
              {Object.prototype.hasOwnProperty.call(post, "time") &&
                post.time !== "" && (
                  <div className={classes.tag}>
                    <AccessTime
                      color="primary"
                      style={{ marginRight: "0.5em" }}
                    />
                    {post.time.format("MM/DD/YYYY, h:mm a")}
                  </div>
                )}
              {Object.prototype.hasOwnProperty.call(post, "location") &&
                post.location !== "" && (
                  <div className={classes.tag}>
                    <Place color="primary" style={{ marginRight: "0.5em" }} />
                    {post.location}
                  </div>
                )}
              {Object.prototype.hasOwnProperty.call(post, "styles") &&
                post.styles.length > 0 &&
                post.styles.map((style) => (
                  <Chip
                    className={classes.chip}
                    key={style}
                    label={style}
                    color="primary"
                    variant="outlined"
                  />
                ))}
            </div>
            <CardContent className={classes.content}>
              <Typography variant="subtitle1" color="textSecondary">
                {post.content}
              </Typography>
            </CardContent>
            <CardActions className={classes.action} disableSpacing>
              <div>
                <IconButton onClick={handleLike}>
                  <Favorite
                    style={{
                      color: post.likes[user._id] ? "red" : "inherit",
                    }}
                  />
                </IconButton>
                <Typography variant="subtitle2" component="span">
                  {`${post.likesNum} likes`}
                </Typography>
              </div>
              <div className={classes.commentBlock}>
                <TextField
                  className={classes.input}
                  variant="outlined"
                  placeholder="write comment..."
                  InputProps={{
                    classes: {
                      root: classes.inputInput,
                      notchedOutline: classes.inputFieldset,
                    },
                  }}
                />
                <IconButton>
                  <SendRounded color="primary" />
                </IconButton>
              </div>
            </CardActions>
          </div>
        </div>
      </Card>
    </div>
  );
}
