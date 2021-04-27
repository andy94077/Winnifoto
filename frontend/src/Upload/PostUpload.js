/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Chip,
  IconButton,
  TextField,
  Button,
  CardActions,
} from "@material-ui/core";
import { AccessTime, Place, CloudUploadRounded } from "@material-ui/icons";
import { useSelector } from "react-redux";

import CardImages from "../components/CardImages";
import { SERVER } from "../config";
import { selectUser } from "../redux/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: "56.25%",
    width: "100%",
    height: 0,
    maxWidth: 800,
    minWidth: 320,
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
    overflow: "auto",
  },
  tagAndContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: "10px 10px 0 13px",
  },
  content: {
    flex: "1 0 auto",
    padding: "10px 0 0",
    "&:last-child": { paddingBottom: "initial" },
  },
  uploadBlock: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  tag: {
    display: "flex",
    alignItems: "center",
    marginBottom: 5,
  },
  chip: {
    margin: "5px 3px 0 0",
    height: 30,
    maxWidth: "99%",
  },
  button: {
    width: 130,
    height: 40,
    borderRadius: 15,
  },
  inputRoot: {
    height: "100% !important",
    padding: 10,
    mixHeight: 200,
  },
  inputInput: {
    height: "100% !important",
    overflowY: "auto !important",
  },
  style: {
    margin: "5px 3px 0 0",
    height: 30,
    width: 100,
    borderRadius: 16,
  },
  location: {
    height: 30,
    width: 100,
    borderRadius: 10,
  },
}));

export default function PostUpload(props) {
  const {
    channel,
    updatePost,
    onUpload = () => {},
    className = "",
    classes: classesProps = { root: "", card: "" },
  } = props;
  const user = useSelector(selectUser);
  const classes = useStyles();
  const [uploaded, setUploaded] = useState(updatePost !== undefined);
  const [post, setPost] = useState(
    updatePost === undefined
      ? {
          type: channel,
          time: "",
          location: "",
          newStyle: "",
          styles: [],
          content: "",
          urls: [],
          images: [],
        }
      : {
          ...updatePost,
          time:
            updatePost.time === ""
              ? ""
              : updatePost.time.format("yyyy-MM-DDThh:mm"),
          newStyle: "",
          urls: updatePost.images,
        }
  );

  const handleUpload = (e) => {
    // console.log(e.target.files);
    setPost((pre) => ({
      ...pre,
      urls: Object.values(e.target.files).map((file) =>
        URL.createObjectURL(file)
      ),
      images: Object.values(e.target.files),
    }));
    setUploaded(true);
  };

  const handleChangePost = (field) => (e) =>
    setPost((pre) => ({ ...pre, [field]: e.target.value }));

  const handleAddStyle = (e) => {
    if (e.key === "Enter" && !/^\s*$/.test(e.target.value)) {
      setPost((pre) => ({
        ...pre,
        styles: [...pre.styles, pre.newStyle],
        newStyle: "",
      }));
    }
  };

  const handleSubmit = async () => {
    const { newStyle, urls, images, styles, ...data } = post;
    if (newStyle !== "") styles.push(newStyle);

    const formData = new FormData();
    ["type", "time", "location", "content"].forEach((key) =>
      formData.append(key, data[key])
    );
    formData.append("user", user._id);
    if (updatePost === undefined) {
      for (const img of images) {
        formData.append("images", img);
      }
    } else formData.append("postID", post._id);
    for (const style of styles) {
      formData.append("styles", style);
    }

    formData.append("token", user.token);

    try {
      const { data: returnData } = await (updatePost === undefined
        ? SERVER.post("/post", formData)
        : SERVER.put("/post", formData));
      setPost({
        type: channel,
        time: "",
        location: "",
        newStyle: "",
        styles: [],
        content: "",
        urls: [],
        images: [],
      });
      setUploaded(false);
      onUpload(returnData);
    } catch (err) {
      // console.log(err.response);
    }
  };

  const handleDeleteStyle = (style) => () =>
    setPost((pre) => ({
      ...pre,
      styles: pre.styles.filter((item) => item !== style),
    }));

  return (
    <div className={`${classes.root} ${className} ${classesProps.root}`}>
      <Card className={`${classes.card} ${classesProps.card}`}>
        {uploaded ? (
          <CardImages images={post.urls} />
        ) : (
          <div className={classes.uploadBlock}>
            <label htmlFor="upload-post">
              <input
                id="upload-post"
                onChange={handleUpload}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
              />
              <IconButton color="primary" component="span">
                <CloudUploadRounded fontSize="large" />
              </IconButton>
            </label>
          </div>
        )}
        <div className={classes.details}>
          <div className={classes.tagAndContent}>
            <div className={classes.tag}>
              <AccessTime color="primary" style={{ marginRight: "0.5em" }} />
              <TextField
                label="time"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={post.time}
                onChange={handleChangePost("time")}
              />
            </div>
            <div className={classes.tag}>
              <Place color="primary" style={{ marginRight: "0.5em" }} />
              <TextField
                variant="outlined"
                placeholder="location"
                value={post.location}
                onChange={handleChangePost("location")}
                InputProps={{ className: classes.location }}
              />
            </div>
            <div>
              {post.styles.map((style) => (
                <Chip
                  className={classes.chip}
                  key={style}
                  label={style}
                  color="primary"
                  variant="outlined"
                  onDelete={handleDeleteStyle(style)}
                />
              ))}
            </div>
            <TextField
              InputProps={{ className: classes.style }}
              variant="outlined"
              placeholder="new style..."
              value={post.newStyle}
              onChange={handleChangePost("newStyle")}
              onKeyUp={handleAddStyle}
            />
            <CardContent className={classes.content}>
              <TextField
                style={{ height: "100%" }}
                variant="outlined"
                fullWidth
                value={post.content}
                onChange={handleChangePost("content")}
                InputProps={{
                  classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  },
                }}
                multiline
              />
            </CardContent>
          </div>
          <CardActions className={classes.controls}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
