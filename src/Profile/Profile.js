import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Button } from "@material-ui/core";
import { AccountCircleOutlined } from "@material-ui/icons";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PostGrid from "../components/PostGrid";
import { SERVER } from "../config";
import ErrorMessage from "../components/ErrorMessage";
import CustomModal from "../components/CustomModal";
import UploadPost from "../Upload/PostUpload";
import { selectUser } from "../redux/userSlice";
import Loading from "../components/Loading";
import ProfileAvatar from "./ProfileAvatar";

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
  userBlock: {
    flex: 1,
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
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
  cardRoot: { width: "80%" },
  card: {
    top: "40%",
    transform: "translateY(-40%)",
  },
}));

export default function Profile() {
  const { userID } = useParams();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ error: false, msg: "" });
  const [profileUser, setProfileUser] = useState({
    _id: null,
    name: "",
    avatarUri: "",
  });
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  const handleOpenModal = (isOpen) => () => setOpenModal(isOpen);
  const onUpload = (newPost) => {
    setPosts((pre) => [
      ...pre,
      {
        ...newPost,
        time:
          newPost.time === "" || newPost.time === null
            ? ""
            : moment(newPost.time),
        createdAt: moment(newPost.createdAt),
      },
    ]);
    setOpenModal(false);
  };

  useEffect(async () => {
    if (userID === undefined || userID === null) return;
    setIsLoading(true);
    try {
      const { data } = await SERVER.get("/user", { params: { userID } });
      setPosts(
        data.posts.map((post) => ({
          ...post,
          time: post.time === "" || post.time === null ? "" : moment(post.time),
          user: { _id: post.user, name: data.name, avatarUri: data.avatarUri },
          createdAt: moment(post.createdAt),
        }))
      );

      setProfileUser({
        _id: data._id,
        name: data.name,
        avatarUri: data.avatarUri,
      });
      setError({ error: false, msg: "" });
    } catch (err) {
      setError({ error: true, msg: err.response.data.msg });
    } finally {
      setIsLoading(false);
    }
  }, [userID, user.avatarUri]);

  if (isLoading) return <Loading />;
  if (error.error)
    return (
      <ErrorMessage
        msg={error.msg}
        icon={<AccountCircleOutlined />}
        circle={false}
      />
    );
  return (
    <>
      <div className={classes.root}>
        <div className={classes.header}>
          <ProfileAvatar user={profileUser} />
          <div className={classes.userBlock}>
            <Typography variant="h2" gutterBottom className={classes.username}>
              {profileUser.name}
            </Typography>
            {user._id === userID && (
              <Button
                style={{ borderRadius: 10 }}
                color="primary"
                variant="contained"
                onClick={handleOpenModal(true)}
              >
                Upload
              </Button>
            )}
          </div>
        </div>
        <div className={classes.divider} />
        <PostGrid posts={posts} setPosts={setPosts} />
      </div>
      <CustomModal open={openModal} setOpen={setOpenModal}>
        <UploadPost
          classes={{ root: classes.cardRoot, card: classes.card }}
          channel="normal"
          onUpload={onUpload}
        />
      </CustomModal>
    </>
  );
}
