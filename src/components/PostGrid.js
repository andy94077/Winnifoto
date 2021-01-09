import React, { useState } from "react";
import { GridList } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PostPreview from "./PostPreview";
import CustomModal from "./CustomModal";
import Post from "./Post";

export default function PostGrid(props) {
  const { posts, cols = 3 } = props;
  const theme = useTheme();
  const widthMatches = useMediaQuery(theme.breakpoints.up("md"));
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const handleClickPost = (post) => () => {
    setModalContent(post);
    setOpenModal(true);
  };

  return (
    <>
      <GridList cellHeight="auto" cols={cols}>
        {posts.map((post) => (
          <PostPreview
            key={post.id}
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
        <Post post={modalContent} />
      </CustomModal>
    </>
  );
}
