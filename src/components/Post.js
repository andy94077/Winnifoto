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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  AccessTime,
  Place,
  Favorite,
  SendRounded,
  MoreVert,
} from "@material-ui/icons";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "../redux/userSlice";
import CardImages from "./CardImages";
import CONCAT_SERVER_URL from "../utils";
import { SERVER } from "../config";
import CustomModal from "./CustomModal";
import UploadPost from "../Upload/UploadPost";
import AlertDialog from "./AlertDialog";
import ErrorMessage from "./ErrorMessage";

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
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  contentAndComment: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  content: { paddingTop: 10 },
  contentText: { whiteSpace: "pre", padding: "0 5px" },
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
  listItem: {
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    margin: "3px 0",
    lineBreak: "anywhere",
  },
  listItemText: {
    flex: "none",
    marginRight: 5,
  },
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
  uploadRoot: { width: "80%" },
  uploadCard: {
    top: "40%",
    transform: "translateY(-40%)",
  },
}));

export default function Post(props) {
  const {
    post,
    setPosts,
    onDelete = () => {},
    className = "",
    classes: classesParam = { root: "", card: "" },
  } = props;
  const location = useLocation();
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [deleted, setDeleted] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const updatePosts = (data) =>
    setPosts((pre) => {
      const newArray = [...pre];
      const i = newArray.findIndex((item) => item._id === data._id);
      newArray[i] = {
        ...data,
        time: data.time === "" || data.time === null ? "" : moment(data.time),
        createdAt: moment(data.createdAt),
      };
      return newArray;
    });

  const onUpload = (data) => {
    updatePosts(data);
    setOpenModal(false);
  };

  const handleLike = async () => {
    try {
      const { data } = await SERVER.put("/post/like", {
        user: user._id,
        token: user.token,
        postID: post._id,
      });
      updatePosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async () => {
    try {
      const { data } = await SERVER.put("/post/comment", {
        user: user._id,
        token: user.token,
        postID: post._id,
        comment: newComment,
      });
      updatePosts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setNewComment("");
    }
  };

  const handleDeletePost = async () => {
    try {
      await SERVER.delete("/post", {
        data: {
          user: user._id,
          token: user.token,
          postID: post._id,
        },
      });
      setDeleted(true);
      setPosts((pre) => pre.filter((prePost) => prePost._id !== post._id));
      onDelete();
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") handleComment();
  };

  if (deleted) return <ErrorMessage msg="Post Is Deleted" />;
  return (
    <>
      <div className={`${classes.root} ${className} ${classesParam.root}`}>
        <Card className={`${classes.card} ${classesParam.card}`}>
          <CardImages images={post.images} />
          <div className={classes.details}>
            <CardHeader
              avatar={
                location.pathname === `/profile/${post.user._id}` ? (
                  <Avatar
                    alt={post.user.name}
                    src={CONCAT_SERVER_URL(post.user.avatarUri)}
                  />
                ) : (
                  <Link
                    to={`/profile/${post.user._id}`}
                    className={classes.link}
                  >
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
                  post.createdAt - moment().subtract(5, "days") ? (
                    post.createdAt.calendar()
                  ) : (
                    post.createdAt.fromNow()
                  )
                ) : (
                  <Link to={`/post/${post._id}`} className={classes.link}>
                    {post.createdAt - moment().subtract(5, "days")
                      ? post.createdAt.calendar()
                      : post.createdAt.fromNow()}
                  </Link>
                )
              }
              action={
                user._id === post.user._id && (
                  <>
                    <IconButton size="small" onClick={handleMenuOpen}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      keepMounted
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          handleOpenModal();
                        }}
                      >
                        edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          handleOpenDialog();
                        }}
                      >
                        delete
                      </MenuItem>
                    </Menu>
                  </>
                )
              }
            />
            <div className={classes.contentAndComment}>
              <div style={{ marginLeft: 13 }}>
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
                <Typography
                  className={classes.contentText}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  {post.content}
                </Typography>
                <List dense>
                  {post.comments.map((comment) => (
                    <ListItem
                      alignItems="flex-start"
                      className={classes.listItem}
                      key={comment._id}
                    >
                      <ListItemAvatar>
                        <Link
                          className={classes.link}
                          to={`/profile/${comment.user._id}`}
                        >
                          <Avatar
                            alt={comment.user.name}
                            src={CONCAT_SERVER_URL(comment.user.avatarUri)}
                          />
                        </Link>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Link
                            className={classes.link}
                            to={`/profile/${comment.user._id}`}
                          >
                            {comment.user.name}
                          </Link>
                        }
                        secondary={comment.content}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </div>
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
                  value={newComment}
                  onChange={handleCommentChange}
                  onKeyUp={handleKeyUp}
                />
                <IconButton onClick={handleComment}>
                  <SendRounded color="primary" />
                </IconButton>
              </div>
            </CardActions>
          </div>
        </Card>
      </div>
      <CustomModal open={openModal} setOpen={setOpenModal}>
        <UploadPost
          classes={{ root: classes.uploadRoot, card: classes.uploadCard }}
          channel="normal"
          onUpload={onUpload}
          updatePost={post}
        />
      </CustomModal>
      <AlertDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Do you want to delete this post?"
        content="This action cannot undo."
        actions={[{ action: handleDeletePost, text: "yes" }, { text: "no" }]}
      />
    </>
  );
}
