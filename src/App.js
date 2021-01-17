import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useSelector } from "react-redux";
import Profile from "./Profile/Profile";
import Bar from "./Bar/Bar";
import Post from "./components/Post";
import { selectUser } from "./redux/userSlice";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
  },
});

export default function App() {
  const user = useSelector(selectUser);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Bar />
      {/* <Post
        post={{
          id: 123,
          images: ["/images/w.jpg"],
          time: moment().add(3, "days"),
          location: "Taipei",
          styles: ["style1", "style2"],
          likesNum: 3,
          commentsNum: 10,
          body: "This is the body.",
          user,
          createAt: moment().subtract(3, "days"),
        }}
      /> */}
      <Profile />
    </div>
  );
}
