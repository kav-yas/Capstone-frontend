import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FaHome, FaTasks, FaChartBar, FaBullseye, FaUsers, FaBell, FaTrophy, FaCog } from "react-icons/fa";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      {/* ✅ Navbar is now fixed */}
      <AppBar position="fixed" style={{ backgroundColor: "#030307", zIndex: 1100 }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h5" sx={{ flexGrow: 1, color: "white" }}>
            HABIT_SYNC
          </Typography>

          <Button>
            <Link to="/" style={{ color: "whitesmoke", textDecoration: "none" }}>Home</Link>
          </Button>

          {!isLoggedIn ? (
            <>
              <Button>
                <Link to="/signup" style={{ color: "whitesmoke", textDecoration: "none" }}>Signup</Link>
              </Button>
              <Button>
                <Link to="/login" style={{ color: "whitesmoke", textDecoration: "none" }}>Login</Link>
              </Button>
            </>
          ) : (
            <Button onClick={handleLogout} style={{ color: "whitesmoke" }}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* ✅ Prevent content from overlapping Navbar */}
      <Box sx={{ paddingTop: "64px" }}>

        {/* Sidebar Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List sx={{ width: 250 }}>
            <ListItem button component={Link} to="/" onClick={() => setDrawerOpen(false)}>
              <FaHome style={{ marginRight: 10 }} />
              <ListItemText primary="Home" />
            </ListItem>

            {isLoggedIn && (
              <>
                <ListItem button component={Link} to="/my-habits" onClick={() => setDrawerOpen(false)}>
                  <FaTasks style={{ marginRight: 10 }} />
                  <ListItemText primary="My Habits" />
                </ListItem>

                <ListItem button component={Link} to="/track-progress" onClick={() => setDrawerOpen(false)}>
                  <FaChartBar style={{ marginRight: 10 }} />
                  <ListItemText primary="Track Progress" />
                </ListItem>

                <ListItem button component={Link} to="/challenges-goals" onClick={() => setDrawerOpen(false)}>
                  <FaBullseye style={{ marginRight: 10 }} />
                  <ListItemText primary="Challenges & Goals" />
                </ListItem>

                <ListItem button component={Link} to="/community" onClick={() => setDrawerOpen(false)}>
                  <FaUsers style={{ marginRight: 10 }} />
                  <ListItemText primary="Community & Friends" />
                </ListItem>

                <ListItem button component={Link} to="/notifications" onClick={() => setDrawerOpen(false)}>
                  <FaBell style={{ marginRight: 10 }} />
                  <ListItemText primary="Reminders & Notifications" />
                </ListItem>

                <ListItem button component={Link} to="/rewards" onClick={() => setDrawerOpen(false)}>
                  <FaTrophy style={{ marginRight: 10 }} />
                  <ListItemText primary="Rewards & Achievements" />
                </ListItem>

                <ListItem button component={Link} to="/settings" onClick={() => setDrawerOpen(false)}>
                  <FaCog style={{ marginRight: 10 }} />
                  <ListItemText primary="Settings" />
                </ListItem>

                <Divider />

                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
