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
import { useHistory } from "react-router-dom";
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
    overflow: "auto",
  },
  content: {
    flex: "1 0 auto",
    padding: 10,
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
  chip: { margin: "5px 3px 0 0", height: 30 },
  button: {
    width: 130,
    height: 40,
    borderRadius: 15,
  },
}));

export default function UploadPost(props) {
  const {
    channel,
    className = "",
    classes: classesProps = { root: "", card: "" },
  } = props;
  const user = useSelector(selectUser);
  const history = useHistory();
  const classes = useStyles();
  const [uploaded, setUploaded] = useState(false);
  const [post, setPost] = useState({
    type: channel,
    time: "", // moment().format("yyyy-MM-DDThh:mm"),
    location: "",
    newStyle: "",
    styles: [],
    content: "",
    urls: [],
    images: [],
  });

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
    if (e.key === "Enter") {
      setPost((pre) => ({
        ...pre,
        styles: [...pre.styles, pre.newStyle],
        newStyle: "",
      }));
    }
  };

  const handleSubmit = async () => {
    const { newStyle, urls, images, ...data } = post;
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    formData.append("user", user._id);
    for (const img of post.images) {
      formData.append("images", img);
    }
    formData.append("token", user.token);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      await SERVER.post("/post", formData, config);
      // history.go(0);
    } catch (err) {
      console.log(err.response);
    }
  };

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
                value={post.files}
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
          <div style={{ margin: "10px 0 0 13px" }}>
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
                InputProps={{
                  style: {
                    height: 30,
                    width: 100,
                    borderRadius: 10,
                  },
                }}
              />
            </div>
            {post.styles.map((style, i) => (
              <Chip
                className={classes.chip}
                key={`${style}_${i}`}
                label={style}
                color="primary"
                variant="outlined"
              />
            ))}
            <TextField
              InputProps={{
                style: {
                  margin: "5px 3px 0 0",
                  height: 30,
                  width: 100,
                  borderRadius: 16,
                },
              }}
              variant="outlined"
              placeholder="new style..."
              value={post.newStyle}
              onChange={handleChangePost("newStyle")}
              onKeyUp={handleAddStyle}
            />
          </div>
          <CardContent className={classes.content}>
            <TextField
              style={{ height: "100%" }}
              variant="outlined"
              fullWidth
              value={post.content}
              onChange={handleChangePost("content")}
              InputProps={{ style: { padding: 10, height: "100%" } }}
              multiline
              rows={8}
            />
          </CardContent>
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
