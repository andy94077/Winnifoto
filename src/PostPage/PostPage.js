import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import moment from "moment";
import { useParams } from "react-router-dom";

import Post from "../components/Post";
import { SERVER } from "../config";
import ErrorMessage from "../components/ErrorMessage";

export default function PostPage() {
  const { postID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ error: false, msg: "" });
  const [post, setPost] = useState({});

  useEffect(async () => {
    if (postID === undefined || postID === null) return;
    try {
      const { data } = await SERVER.get("/post", { params: { postID } });
      setPost({
        ...data,
        time: data.time === "" || data.time === null ? "" : moment(data.time),
        createAt: moment(data.createAt),
      });
    } catch (err) {
      setError({ error: true, msg: err.response.data.msg });
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <CircularProgress />;
  if (error.error) return <ErrorMessage msg={error.msg} />;
  return <Post post={post} />;
}
