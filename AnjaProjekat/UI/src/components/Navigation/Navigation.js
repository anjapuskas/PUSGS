import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, ListItemIcon, Divider, Typography } from '@mui/material';
import { AccountCircle, Logout, AddBox } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { logout } from 'slices/userSlice';
import styles from './Navigation.module.css';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const userRole = useSelector((state) => state.user.user.userRole);
  const numberOfItemsInCart = useSelector((state) => state.cart.amount);
  
  const isSeller = userRole === 'SELLER';
  const isBuyer = userRole === 'BUYER';

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleAddProductClick = () => {
    navigate('/add-product');
  };

  const handleProductsClick = () => {
    navigate('/products');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    handleMenuClose();
  };

  return (
    <div >
      <AppBar className={styles.navbar} position="static" color="default">
        <Toolbar>
          <div>
            <IconButton edge="start" color="inherit" onClick={handleLogoClick}>
              <Typography variant="h6" component="span">
                Shop
              </Typography>
            </IconButton>
          </div>
          <div style={{ flexGrow: 1 }} />
          {isSeller && (
            <div>
              <IconButton edge="start" color="inherit" onClick={handleAddProductClick}>
                <AddBox />
                <Typography variant="body1" component="span">
                  Add Product
                </Typography>
              </IconButton>
            </div>
          )}
          {isBuyer && (
            <div>
              <IconButton edge="start" color="inherit" onClick={handleProductsClick}>
                <InventoryIcon />
                <Typography variant="body1" component="span">
                  Products
                </Typography>
              </IconButton>
            </div>
          )}
          <div style={{ flexGrow: 1 }} />
          {isBuyer && (
            <div>
              <IconButton edge="start" color="inherit" onClick={handleCartClick}>
                <ShoppingCartIcon />
                {numberOfItemsInCart > 0 && <span className={styles.cartItemCount}>{numberOfItemsInCart}</span>}
              </IconButton>
            </div>
          )}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
