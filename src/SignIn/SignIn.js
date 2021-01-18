import React, { useState } from "react";
import {
  Button,
  makeStyles,
  TextField,
  Paper,
  Typography,
  Avatar,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { useDispatch } from "react-redux";

import { setUser } from "../redux/userSlice";
import { SERVER } from "../config";
import CustomModal from "../components/CustomModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 350,
    padding: "20px 0",
    borderRadius: 15,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  field: {
    width: 250,
    borderRadius: 5,
    margin: "20px 0 10px",
  },
  input: {
    height: 75,
    marginBottom: 20,
    "&:last-of-type": { marginBottom: 0 },
  },
  button: {
    width: 130,
    height: 40,
    borderRadius: 15,
    marginTop: 10,
  },
}));

export default function SignIn(props) {
  const { open, setOpen } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loginUser, setLoginUser] = useState({ username: "", password: "" });
  const [error, setError] = useState({ error: false, msg: "" });

  const handleSubmit = async () => {
    try {
      const { data } = await SERVER.post("/login", loginUser);
      setError({ error: false, msg: "" });
      dispatch(setUser(data));
      setOpen(false);
    } catch (err) {
      setError({ error: true, msg: err.response.data.msg });
    }
  };

  const handleLoginValue = (field) => (e) => {
    setError({ error: false, msg: "" });
    setLoginUser((pre) => ({ ...pre, [field]: e.target.value }));
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <CustomModal open={open} setOpen={setOpen}>
      <Paper className={classes.root}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h4">Sign In</Typography>
        <div className={classes.field}>
          <TextField
            className={classes.input}
            variant="outlined"
            label="Username"
            required
            fullWidth
            InputProps={{ style: { borderRadius: 15 } }}
            value={loginUser.username}
            error={error.error}
            helperText={error.msg.username}
            onChange={handleLoginValue("username")}
          />
          <TextField
            className={classes.input}
            variant="outlined"
            label="Password"
            required
            fullWidth
            InputProps={{ style: { borderRadius: 15 } }}
            value={loginUser.password}
            type="password"
            error={error.error}
            helperText={error.msg.password}
            onChange={handleLoginValue("password")}
            onKeyUp={handleKeyUp}
          />
        </div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Paper>
    </CustomModal>
  );
}
