import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import {
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Slider,
} from "@material-ui/core";
import { CloudUploadRounded } from "@material-ui/icons";
import { useSelector } from "react-redux";

import AlertDialog from "../components/AlertDialog";
import { SERVER } from "../config";
import { selectUser } from "../redux/userSlice";

const useStyles = makeStyles({
  root: {
    width: "100%",
    borderRadius: 10,
    textAlign: "center",
  },
  editor: {
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
  const editorRef = useRef();

  const handleZoomChange = (_e, newValue) => setZoom(newValue);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("user", user._id);
    formData.append("token", user.token);
    formData.append("avatar", uploadFile);

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

  const paperWidth = 500;
  return (
    <Paper className={classes.root} style={{ maxWidth: paperWidth }}>
      <AvatarEditor
        className={classes.editor}
        ref={editorRef}
        width={300}
        height={300}
        borderRadius={300 / 2}
        scale={zoom}
        image={uploadFile}
        style={{ width: paperWidth, height: paperWidth }}
      />
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
        endIcon={isLoading && <CircularProgress />}
        disabled={isLoading}
      >
        Submit
      </Button>
    </Paper>
  );
}
