import React from 'react';
import { useState } from 'react';
import styles from './HomeForm.module.css';
import { logout } from 'slices/userSlice';
import { useDispatch } from 'react-redux';
import { Divider, ListItemIcon, MenuItem, Menu } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const HomeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/profile")
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    handleMenuClose();
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>My Website</div>
        <div>
          <AccountCircle
            fontSize="medium"
            className={styles.profileIcon}
            onClick={handleMenuOpen}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className={styles.menu}
          >
            <MenuItem onClick={handleProfileClick}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </nav>
      <div className={styles.content}>
        <h1>Welcome to the Home Page</h1>
        {/* Add your content here */}
      </div>
    </div>
  );
};

export default HomeForm;
