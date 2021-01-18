import React, { useState } from "react";
import { GridList, Typography } from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PhotoCameraOutlined } from "@material-ui/icons";

import PostPreview from "./PostPreview";
import CustomModal from "./CustomModal";
import Post from "./Post";

const useStyles = makeStyles({
  cardRoot: { width: "80%" },
  card: {
    top: "40%",
    transform: "translateY(-40%)",
  },
  noPosts: {
    borderRadius: "50%",
    border: "3px solid black",
    padding: 13,
    fontSize: "5em",
    margin: "20px 0",
  },
});

export default function PostGrid(props) {
  const { posts, cols = 3 } = props;
  const classes = useStyles();
  const theme = useTheme();
  const widthMatches = useMediaQuery(theme.breakpoints.up("md"));
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const handleClickPost = (post) => () => {
    setModalContent(post);
    setOpenModal(true);
  };

  if (posts.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <PhotoCameraOutlined className={classes.noPosts} />
        <Typography variant="h4" style={{ fontWeight: 300 }}>
          No Posts Yet
        </Typography>
      </div>
    );
  }
  return (
    <>
      <GridList cellHeight="auto" cols={cols}>
        {posts.map((post) => (
          <PostPreview
            key={post._id}
            post={post}
            onClick={handleClickPost(post)}
            style={
              widthMatches
                ? {
                    width: `${100 / cols - 1}%`,
                    margin: "0.5%",
                    paddingTop: `${100 / cols - 1}%`,
                  }
                : {
                    width: `${100 / cols}%`,
                    paddingTop: `${100 / cols}%`,
                  }
            }
          />
        ))}
      </GridList>
      <CustomModal open={openModal} setOpen={setOpenModal}>
        <Post
          post={modalContent}
          classes={{ root: classes.cardRoot, card: classes.card }}
        />
      </CustomModal>
    </>
  );
}
