import React, { useState, useRef } from "react";
import { Avatar, makeStyles, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";

import { selectUser, setAvatarUri } from "../redux/userSlice";
import CONCAT_SERVER_URL from "../utils";
import CustomModal from "../components/CustomModal";
import AvatarUpload from "../Upload/AvatarUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    outline: "none",
    display: "inline",
    margin: "0 50px 30px 30px",
    [theme.breakpoints.down("sm")]: {
      margin: "0 35px 25px 20px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0 25px 10px 15px",
    },
    "&:hover .avatar": { filter: "brightness(0.6)" },
    "&:hover .edit-avatar": { display: "block" },
  },
  avatar: {
    height: 150,
    width: 150,
    [theme.breakpoints.down("sm")]: {
      height: 130,
      width: 130,
    },
    [theme.breakpoints.down("xs")]: {
      height: 80,
      width: 80,
    },
  },
  label: { display: "none" },
  editButton: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    color: "#eeeeee",
  },
}));

export default function ProfileAvatar(props) {
  const { user: profileUser } = props;
  const classes = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [uploadFile, setUploadFile] = useState();
  const inputRef = useRef(null);

  const clearUploadFile = () => setUploadFile(undefined);

  const handleUpload = (e) => {
    if (e.target.files[0] !== undefined) {
      setUploadFile(e.target.files[0]);
      e.target.value = null;
      setOpenModal(true);
    }
  };

  const onUpload = (path) => {
    dispatch(setAvatarUri(path));
    setOpenModal(false);
    setUploadFile(undefined);
  };

  if (user.name === profileUser.name) {
    return (
      <>
        <div className={classes.root}>
          <Avatar
            className={`${classes.avatar} avatar`}
            alt={user.name}
            src={CONCAT_SERVER_URL(user.avatarUri)}
          />
          <label
            className={`${classes.label} edit-avatar`}
            htmlFor="upload-avatar"
          >
            <input
              id="upload-avatar"
              ref={inputRef}
              onChange={handleUpload}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
            <IconButton className={classes.editButton} component="span">
              <EditIcon fontSize="large" />
            </IconButton>
          </label>
        </div>
        <CustomModal
          open={openModal}
          setOpen={setOpenModal}
          onClose={clearUploadFile}
        >
          <AvatarUpload uploadFile={uploadFile} onUpload={onUpload} />
        </CustomModal>
      </>
    );
  }
  return (
    <Avatar
      className={classes.avatar}
      alt={profileUser.name}
      src={CONCAT_SERVER_URL(profileUser.avatarUri)}
    />
  );
}
