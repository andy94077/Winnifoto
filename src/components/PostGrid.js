import React, { useState } from "react";
import { GridList } from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import PostPreview from "./PostPreview";
import CustomModal from "./CustomModal";
import Post from "./Post";
import ErrorMessage from "./ErrorMessage";

const useStyles = makeStyles({
  cardRoot: { width: "80%" },
  card: {
    top: "40%",
    transform: "translateY(-40%)",
  },
});

export default function PostGrid(props) {
  const { posts, setPosts, cols = 3 } = props;
  const classes = useStyles();
  const theme = useTheme();
  const widthMatches = useMediaQuery(theme.breakpoints.up("md"));
  const [openModal, setOpenModal] = useState(false);
  const [postIdx, setPostIdx] = useState();

  const handleCloseModal = () => setOpenModal(false);
  const handleClickPost = (i) => () => {
    setPostIdx(i);
    setOpenModal(true);
  };

  if (posts.length === 0) return <ErrorMessage msg="No Post Yet" />;

  return (
    <>
      <GridList cellHeight="auto" cols={cols}>
        {posts.map((post, i) => (
          <PostPreview
            key={post._id}
            post={post}
            onClick={handleClickPost(i)}
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
          post={posts[postIdx]}
          setPosts={setPosts}
          classes={{ root: classes.cardRoot, card: classes.card }}
          onDelete={handleCloseModal}
          onClose={handleCloseModal}
        />
      </CustomModal>
    </>
  );
}
