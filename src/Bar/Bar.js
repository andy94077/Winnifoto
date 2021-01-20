import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  useMediaQuery,
  Avatar,
} from "@material-ui/core";
import {
  FaceRounded,
  MoreVertRounded,
  SearchRounded,
  PhotoCameraRounded,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

import CustomModal from "../components/CustomModal";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignIn/SignUp";
import CONCAT_SERVER_URL from "../utils";
import { selectUser } from "../redux/userSlice";
import { deleteCookie } from "../cookieHelper";

const useStyles = makeStyles((theme) => ({
  grow: { flexGrow: 1, width: "100%" },
  appBar: {
    backgroundColor: "#fafafa",
    color: "#333",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  toolbar: {
    display: "flex",
    maxWidth: 1200,
    width: "100%",
  },
  menuButton: { marginRight: theme.spacing(2) },
  block: {
    [theme.breakpoints.up("sm")]: {
      flex: 1,
    },
  },
  leftBlock: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  middleBlock: { maxWidth: 250 },
  title: {
    display: "inline",
    marginRight: theme.spacing(1),
  },
  link: { textDecoration: "none", height: "100%", color: "black" },
  tabButton: {
    textTransform: "none",
    whiteSpace: "nowrap",
    height: "100%",
    borderRadius: 0,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    "&:hover": {
      backgroundColor: "rgba(60, 75, 130, 0.04)",
    },
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  SearchRounded: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: { color: "inherit" },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from SearchRounded
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  sectionMobile: {
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: "auto",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  offset: theme.mixins.toolbar,
}));

export default function Bar(props) {
  const { channel, setChannel } = props;
  const user = useSelector(selectUser);
  const { searchKey } = useParams();
  const [searchValue, setSearchValue] = useState(
    searchKey === undefined || searchKey === null ? "" : searchKey
  );
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const widthMatches = useMediaQuery(theme.breakpoints.up("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const handleTabChange = (newChannel) => () => setChannel(newChannel);
  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleOpenSignUp = () => setOpenSignUp(true);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleSignOut = () => {
    deleteCookie("token");
    history.go(0);
  };

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleGoToProfile = () => {
    handleMobileMenuClose();
    handleMenuClose();
    history.push(`/profile/${user._id}`);
  };

  const handleMobileMenuOpen = (event) =>
    setMobileMoreAnchorEl(event.currentTarget);

  const handleSearch = (key) => {
    history.push(`/home/${encodeURIComponent(key)}`);
  };

  const handleKeyUpSearch = (e) => {
    if (e.key === "Enter") handleSearch(e.target.value);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleGoToProfile}>Profile</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user._id === null
        ? [
            <MenuItem onClick={handleOpenSignIn} key="sign in">
              Sign in
            </MenuItem>,
            <MenuItem onClick={handleOpenSignUp} key="sign up">
              Sign up
            </MenuItem>,
          ]
        : [
            <MenuItem onClick={handleGoToProfile} key="profile">
              Profile
            </MenuItem>,
            <MenuItem onClick={handleSignOut} key="sign up">
              Sign Out
            </MenuItem>,
          ]}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={`${classes.block} ${classes.leftBlock}`}>
            <Typography className={classes.title} variant="h6">
              <Link to="/" className={classes.link}>
                Winnifoto
              </Link>
            </Typography>

            {widthMatches ? (
              <>
                <Link
                  to={`/home/${encodeURIComponent(searchValue)}`}
                  className={classes.link}
                >
                  <Button
                    className={classes.tabButton}
                    color={
                      channel === "findModel" &&
                      (location.pathname === "/" ||
                        location.pathname.startsWith("/home"))
                        ? "primary"
                        : "default"
                    }
                    startIcon={<FaceRounded />}
                    onClick={handleTabChange("findModel")}
                  >
                    Find Model
                  </Button>
                </Link>
                <Link
                  to={`/home/${encodeURIComponent(searchValue)}`}
                  className={classes.link}
                >
                  <Button
                    className={classes.tabButton}
                    color={
                      channel === "findSnapper" &&
                      (location.pathname === "/" ||
                        location.pathname.startsWith("/home"))
                        ? "primary"
                        : "default"
                    }
                    startIcon={<PhotoCameraRounded />}
                    onClick={handleTabChange("findSnapper")}
                  >
                    Find Snapper
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={`/home/${encodeURIComponent(searchValue)}`}
                  className={classes.link}
                >
                  <IconButton
                    className={classes.tabButton}
                    color={
                      channel === "findModel" &&
                      (location.pathname === "/" ||
                        location.pathname.startsWith("/home"))
                        ? "primary"
                        : "default"
                    }
                    onClick={handleTabChange("findModel")}
                  >
                    <FaceRounded />
                  </IconButton>
                </Link>
                <Link
                  to={`/home/${encodeURIComponent(searchValue)}`}
                  className={classes.link}
                >
                  <IconButton
                    className={classes.tabButton}
                    color={
                      channel === "findSnapper" &&
                      (location.pathname === "/" ||
                        location.pathname.startsWith("/home"))
                        ? "primary"
                        : "default"
                    }
                    onClick={handleTabChange("findSnapper")}
                  >
                    <PhotoCameraRounded />
                  </IconButton>
                </Link>
              </>
            )}
          </div>
          <div className={`${classes.block} ${classes.middleBlock}`}>
            <div className={classes.search}>
              <div className={classes.SearchRounded}>
                <SearchRounded />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={handleKeyUpSearch}
              />
            </div>
          </div>
          <div className={`${classes.block} ${classes.sectionDesktop}`}>
            {user._id === null ? (
              <>
                <Button onClick={handleOpenSignIn}>Sign in</Button>
                <Button onClick={handleOpenSignUp}>Sign Up</Button>
              </>
            ) : (
              <Button
                onClick={handleProfileMenuOpen}
                style={{ textTransform: "none" }}
              >
                <Avatar
                  alt={user.name}
                  src={CONCAT_SERVER_URL(user.avatarUri)}
                  style={{ marginRight: 8 }}
                />
                {user.name}
              </Button>
            )}
          </div>
          <div className={`${classes.block} ${classes.sectionMobile}`}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVertRounded />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
      <CustomModal open={openSignIn} setOpen={setOpenSignIn}>
        <SignIn />
      </CustomModal>
      <CustomModal open={openSignUp} setOpen={setOpenSignUp}>
        <SignUp />
      </CustomModal>
      <div className={classes.offset} />
    </div>
  );
}
