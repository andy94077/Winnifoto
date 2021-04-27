import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import {
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Slider,
} from "@material-ui/core";
import { useSelector } from "react-redux";

import { SERVER } from "../config";
import { selectUser } from "../redux/userSlice";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minWidth: 350,
    borderRadius: 10,
    textAlign: "center",
  },
  editorBlock: {
    position: "relative",
    paddingTop: "100%",
    width: "100%",
    height: 0,
    marginBottom: 6,
  },
  editor: {
    position: "absolute",
    top: 0,
    left: 0,
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
  },
  sliderBlock: {
    display: "flex",
    padding: "0 10%",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: { flex: 1, marginLeft: 20, maxWidth: 200 },
  submitButton: {
    borderBottomLeftRadius: "inherit",
    borderBottomRightRadius: "inherit",
    width: "100%",
    height: 45,
  },
});

export default function AvatarUpload(props) {
  const { uploadFile, onUpload = () => {} } = props;
  const classes = useStyles();
  const user = useSelector(selectUser);

  const [isLoading, setIsLoading] = useState(false);
  const [zoom, setZoom] = useState(1.0);
  let editorRef = useRef();

  const setRef = (ref) => {
    editorRef = ref;
  };

  const handleZoomChange = (_e, newValue) => setZoom(newValue);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("user", user._id);
    formData.append("token", user.token);
    const blob = await new Promise((resolve) =>
      editorRef.getImageScaledToCanvas().toBlob(resolve)
    );
    formData.append("avatar", blob);

    setIsLoading(true);
    try {
      const { data } = await SERVER.put("/user", formData);
      onUpload(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper className={classes.root} style={{ maxWidth: 500 }}>
      <div className={classes.editorBlock}>
        <AvatarEditor
          className={classes.editor}
          ref={setRef}
          width={300}
          height={300}
          borderRadius={300 / 2}
          scale={zoom}
          image={uploadFile}
          // use in-place style to replace default in-place values
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className={classes.sliderBlock}>
        <span>Zoom:</span>
        <Slider
          className={classes.slider}
          value={zoom}
          onChange={handleZoomChange}
          min={1.0}
          max={4.0}
          step={0.05}
        />
      </div>
      <Button
        className={classes.submitButton}
        color="primary"
        onClick={handleSubmit}
        endIcon={isLoading && <CircularProgress size={20} />}
        disabled={isLoading}
      >
        Submit
      </Button>
    </Paper>
  );
}
