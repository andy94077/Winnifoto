import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Chip,
  Typography,
  Avatar,
  CardHeader,
} from "@material-ui/core";
import { AccessTime, Place } from "@material-ui/icons";
import moment from "moment";

import CardImages from "./CardImages";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: "56.25%",
    width: "80%",
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
  content: { flex: "1 0 auto", paddingTop: 10 },
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
}));

export default function Post(props) {
  const { post, className = "", classes = { root: "", card: "" } } = props;
  const postClasses = useStyles();

  return (
    <div className={`${postClasses.root} ${className} ${classes.root}`}>
      <Card className={`${postClasses.card} ${classes.card}`}>
        <CardImages images={post.images} />
        <div className={postClasses.details}>
          <CardHeader
            className={postClasses.header}
            avatar={<Avatar alt={post.user.name} src={post.user.img} />}
            title={post.user.name}
            subheader={
              post.createAt - moment().subtract(5, "days")
                ? post.createAt.calendar()
                : post.createAt.fromNow()
            }
          />
          <div style={{ margin: "10px 0 0 13px" }}>
            {Object.prototype.hasOwnProperty.call(post, "time") && (
              <div className={postClasses.tag}>
                <AccessTime color="primary" style={{ marginRight: "0.5em" }} />
                {post.time.format("MM/DD/YYYY, h:mm a")}
              </div>
            )}
            {Object.prototype.hasOwnProperty.call(post, "location") && (
              <div className={postClasses.tag}>
                <Place color="primary" style={{ marginRight: "0.5em" }} />
                {post.location}
              </div>
            )}
            {Object.prototype.hasOwnProperty.call(post, "styles") &&
              post.styles.map((style) => (
                <Chip
                  className={postClasses.chip}
                  key={style}
                  label={style}
                  color="primary"
                  variant="outlined"
                />
              ))}
          </div>
          <CardContent className={postClasses.content}>
            <Typography variant="subtitle1" color="textSecondary">
              {post.body}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
