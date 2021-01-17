import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GridListTile } from "@material-ui/core";
import {
  FavoriteRounded,
  ChatBubbleRounded,
  PhotoLibraryRounded,
} from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    height: 0,
    paddingTop: "100%",
    overflow: "hidden",
    "&:hover div": { visibility: "visible" },
  },
  tile: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  hover: {
    position: "absolute",
    left: 0,
    top: 0,
    display: "flex",
    visibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(60,60,60,0.3)",
    width: "100%",
    height: "100%",
  },
  block: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    lineHeight: 20,
    color: "white",
    fontSize: 17,
  },
  icon: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 5,
    fontSize: 20,
    transform: "scaleX(-1)",
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    borderRadius: 5,
  },
});

export default function PostPreview(props) {
  const { post, onClick, style = {}, className = "" } = props;
  const classes = useStyles();

  return (
    <GridListTile
      key={post.images[0]}
      classes={{ root: `${classes.root} ${className}`, tile: classes.tile }}
      style={{ ...style }}
      onClick={onClick}
    >
      <img src={post.images[0]} alt={post.title} />
      <div className={classes.hover}>
        <div className={classes.block} style={{ marginRight: "10%" }}>
          <FavoriteRounded
            style={{ color: "white", marginRight: 3, fontSize: 20 }}
          />
          {post.likesNum}
        </div>
        <div className={classes.block} style={{ marginLeft: "10%" }}>
          <ChatBubbleRounded
            style={{ color: "white", marginRight: 3, fontSize: 20 }}
          />
          <span>{post.commentsNum}</span>
        </div>
      </div>
      {post.images.length > 1 && (
        <PhotoLibraryRounded className={classes.icon} />
      )}
    </GridListTile>
  );
}
