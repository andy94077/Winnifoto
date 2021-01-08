import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Avatar,
  CardHeader,
} from "@material-ui/core";
import moment from "moment";

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
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  content: { flex: "1 0 auto" },
  cover: { flex: 1 },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function Post(props) {
  const { post } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia className={classes.cover} image={post.img} />
        <div className={classes.details}>
          <CardHeader
            avatar={<Avatar alt={post.user.name} src={post.user.img} />}
            title={post.user.name}
            subheader={
              post.createAt - moment().subtract(5, "days")
                ? post.createAt.calendar()
                : post.createAt.fromNow()
            }
          />
          <CardContent className={classes.content}>
            <Typography variant="subtitle1" color="textSecondary">
              {post.body}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
