import React from "react";
import { GridList } from "@material-ui/core";
import PostPreview from "./PostPreview";

export default function PostGrid(props) {
  const { posts, cellHeight = 250, cols = 3 } = props;

  return (
    <GridList
      cellHeight={cellHeight}
      cols={cols}
      style={{ width: cellHeight * cols }}
    >
      {posts.map((post) => (
        <PostPreview post={post} />
      ))}
    </GridList>
  );
}
