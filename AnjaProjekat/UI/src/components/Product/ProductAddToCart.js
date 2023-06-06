import React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Divider, Box, IconButton } from '@mui/material';
import styles from './ProductAddToCart.module.css';
import { useDispatch } from 'react-redux';
import { addToCart } from 'slices/cartSlice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductAddToCart = (product) => {

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        
        dispatch(addToCart(product.item))
      };

  return (<>
    <IconButton edge="start" color="inherit" onClick={handleAddToCart} >
      <AddShoppingCartIcon sx={{
      paddingLeft: "40px"
    }}/>
    </IconButton>
  </>
     );
};

export default ProductAddToCart;
