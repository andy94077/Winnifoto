import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";

import Post from "../components/Post";
import { SERVER } from "../config";
import ErrorMessage from "../components/ErrorMessage";

export default function PostPage() {
  const { postID } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState({ error: false, msg: "" });
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    if (postID === undefined || postID === null) return;
    try {
      const { data } = await SERVER.get("/post", { params: { postID } });
      setPosts([
        {
          ...data,
          time: data.time === "" || data.time === null ? "" : moment(data.time),
          createdAt: moment(data.createdAt),
        },
      ]);
    } catch (err) {
      setError({ error: true, msg: err.response.data.msg });
    } finally {
      setIsLoading(false);
    }
  }, [reload]);

  if (isLoading) return <CircularProgress />;
  if (error.error) return <ErrorMessage msg={error.msg} />;
  return (
    <Post
      post={posts[0]}
      setPosts={setPosts}
      onDelete={() => {
        setPosts([]);
        history.push("/");
      }}
    />
  );
}
