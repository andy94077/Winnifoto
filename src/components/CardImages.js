import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, IconButton } from "@material-ui/core";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    position: "relative",
    flex: 1,
  },
  cover: {
    display: "none",
    width: "100%",
    height: "100%",
  },
  active: { display: "block" },
  actionButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#f3f3f3",
    backgroundColor: "rgba(100, 100, 100, 0.6)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      color: "#555",
    },
    "& svg": { fontSize: "1.1em" },
  },
});

export default function CardImages(props) {
  const { images, className = "" } = props;
  const classes = useStyles();

  const [imgIndex, setImgIndex] = useState(0);

  const handleImgChange = (offset) => () =>
    setImgIndex((pre) =>
      Math.max(0, Math.min(pre + offset, images.length - 1))
    );

  return (
    <div className={classes.root}>
      {images.map((image, i) => (
        <CardMedia
          key={image}
          className={clsx(classes.cover, {
            [classes.active]: i === imgIndex,
            [className]: className !== "" && className !== undefined,
          })}
          image={image}
        />
      ))}
      {imgIndex > 0 && (
        <IconButton
          aria-label="left"
          size="small"
          className={classes.actionButton}
          style={{ left: 0, marginLeft: 5 }}
          onClick={handleImgChange(-1)}
        >
          <KeyboardArrowLeftRounded />
        </IconButton>
      )}
      {imgIndex < images.length - 1 && (
        <IconButton
          aria-label="right"
          size="small"
          className={classes.actionButton}
          style={{ right: 0, marginRight: 5 }}
          onClick={handleImgChange(1)}
        >
          <KeyboardArrowRightRounded />
        </IconButton>
      )}
    </div>
  );
}
