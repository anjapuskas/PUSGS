import React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Divider, Box } from '@mui/material';
import styles from './ProductItem.module.css';
import ProductAddToCart from './ProductAddToCart';

const ProductItem = (product) => {
  return (
    <Box
    sx={{
      width: 400,
    }}
  >
<Card className={styles.container}>
    <CardContent>
    <div className={styles.content}>
        <Grid   container
                direction="column"
                justifyContent="space-between"
                alignItems="center">
            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Grid item>
                    <div className={styles.title}>
                        <Typography variant="h4" component="h4">
                            {product.item.name}
                        </Typography>
                    </div>
                </Grid>
                <Grid item>
                <CardMedia
                    component="img"
                    alt="Sample Image"
                    image={product.item.image}
                    height="150"
                    />
                </Grid>
            </Grid>
            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Grid item>
                    <Typography variant="body1" component="p">
                        {product.item.description}
                    </Typography>  
                </Grid>
                <Grid item>
                <Typography variant="body2" component="p" className={styles.price}>
                    Price: {product.item.price} $
                </Typography>
                <ProductAddToCart item={product.item}/>
                </Grid>
            </Grid>
        </Grid>
        </div>
    </CardContent>
</Card>
</Box>
  );
};

export default ProductItem;
