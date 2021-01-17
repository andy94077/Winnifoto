import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  useMediaQuery,
} from "@material-ui/core";
import {
  FaceRounded,
  MoreVertRounded,
  NotificationsRounded,
  SearchRounded,
  MailRounded,
  AccountCircleRounded,
  PhotoCameraRounded,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

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
  link: { textDecoration: "none", height: "100%" },
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
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const widthMatches = useMediaQuery(theme.breakpoints.up("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleTabChange = (newChannel) => () => setChannel(newChannel);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailRounded />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsRounded />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleRounded />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={`${classes.block} ${classes.leftBlock}`}>
            <Typography className={classes.title} variant="h6">
              Winnifoto
            </Typography>

            {widthMatches ? (
              <>
                <Link to="/" className={classes.link}>
                  <Button
                    className={classes.tabButton}
                    color={
                      channel === "findModel" && location.pathname === "/"
                        ? "primary"
                        : "default"
                    }
                    startIcon={<FaceRounded />}
                    onClick={handleTabChange("findModel")}
                  >
                    Find Model
                  </Button>
                </Link>
                <Link to="/" className={classes.link}>
                  <Button
                    className={classes.tabButton}
                    color={
                      channel === "findSnapper" && location.pathname === "/"
                        ? "primary"
                        : "default"
                    }
                    startIcon={<PhotoCameraRounded />}
                    onClick={handleTabChange("findSnapper")}
                    href="/"
                  >
                    Find Snapper
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className={classes.link}>
                  <IconButton
                    className={classes.tabButton}
                    color={channel === "findModel" ? "primary" : "default"}
                    onClick={handleTabChange("findModel")}
                  >
                    <FaceRounded />
                  </IconButton>
                </Link>
                <Link to="/" className={classes.link}>
                  <IconButton
                    className={classes.tabButton}
                    color={channel === "findSnapper" ? "primary" : "default"}
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
              />
            </div>
          </div>
          <div className={`${classes.block} ${classes.sectionDesktop}`}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailRounded />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsRounded />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleRounded />
            </IconButton>
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
      {renderMobileMenu}
      {renderMenu}
      <div className={classes.offset} />
    </div>
  );
}
