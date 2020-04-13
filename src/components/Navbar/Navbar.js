import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
// import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import MailIcon from "@material-ui/icons/Mail";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import TeamtableIcon from "../../images/logo-white-teamtable.svg";
import { history } from "../../utils/history";

// import PropTypes from "prop-types";

// import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
// import Box from "@material-ui/core/Box";
// import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import { StyledButton, LogoIconSvg, SiteName } from "./styles/Navbar.styles.jsx";
import { trackEvent } from "../../utils/GoogleAnalytics";
// import Logo from "../../images/logo.svg";

const useStyles = makeStyles(theme => ({
  nav: {
    height: "55px",
    lineHeight: "55px",
    marginTop: "-8px",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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
      <MenuItem onClick={() => (history.push("/login"))}>Log in</MenuItem>
      <MenuItem onClick={() => {
        history.push("/signup");
        trackEvent("Sign-Up", "Click: Sign up", "Navbar");
      }}
      >Sign up
      </MenuItem>
    </Menu>
  );

  const scrollOptions = { behavior: "smooth", block: "start", inline: "nearest" };

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
      <MenuItem onClick={() => (document.getElementById("about").scrollIntoView(scrollOptions))}>
        About
      </MenuItem>
      <MenuItem onClick={() => (document.getElementById("features").scrollIntoView(scrollOptions))}>
        Features
      </MenuItem>
      <MenuItem onClick={() => (document.getElementById("planned").scrollIntoView(scrollOptions))}>
        Planned Features
      </MenuItem>
      <MenuItem onClick={() => (document.getElementById("contribute").scrollIntoView(scrollOptions))}>
        Contribute
      </MenuItem>
      <MenuItem onClick={() => (history.push("/login"))}>Log in</MenuItem>
      <MenuItem onClick={() => {
        history.push("/signup");
        trackEvent("Sign-Up", "Click: Sign up", "Navbar");
      }}
      >Sign up
      </MenuItem>
    </Menu>
  ); // TODO: ensure, that CallToAction component is not moved when menu opens/closes

  return (
    <div className={classes.grow}>
      {/* <> */}
      {/* <CssBaseline /> */}
      {/* <HideOnScroll {...props}> */}
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <LogoIconSvg src={TeamtableIcon} onClick={() => (history.push("/"))} />
          <SiteName className={classes.title} variant="h6" noWrap onClick={() => (history.push("/"))}>
            TeamTable
          </SiteName>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <StyledButton
              style={{ color: "white", marginRight: "10px" }}
              onClick={() => (document.getElementById("about").scrollIntoView(scrollOptions))}
            >
              About
            </StyledButton>
            <StyledButton
              style={{ color: "white", marginRight: "10px" }}
              onClick={() => (document.getElementById("features").scrollIntoView(scrollOptions))}
            >
              Features
            </StyledButton>
            <StyledButton
              style={{ color: "white", marginRight: "10px" }}
              onClick={() => (document.getElementById("planned").scrollIntoView(scrollOptions))}
            >
              Planned
            </StyledButton>
            <StyledButton
              style={{ color: "white", marginRight: "10px" }}
              onClick={() => (document.getElementById("contribute").scrollIntoView(scrollOptions))}
            >
              Contribute
            </StyledButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/* </HideOnScroll> */}
      {/* </> */}
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Navbar;
