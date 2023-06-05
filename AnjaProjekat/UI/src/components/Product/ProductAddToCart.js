import React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Divider, Box } from '@mui/material';
import styles from './ProductAddToCart.module.css';
import { useDispatch } from 'react-redux';
import { addToCart } from 'slices/cartSlice';

const ProductAddToCart = (product) => {

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        
        dispatch(addToCart(product.item))
      };

  return (
    <button onClick={handleAddToCart} className={styles.button}>Add to cart</button>
     );
};

export default ProductAddToCart;
