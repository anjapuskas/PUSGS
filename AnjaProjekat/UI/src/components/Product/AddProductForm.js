import styles from './AddProductForm.module.css';
import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { DatePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { useDispatch } from 'react-redux';
import { addProductAction } from 'slices/productSlice';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new product object
    const newProduct = {
      name: productName.trim(),
      price: price.trim(),
      amount: amount.trim(),
      description: description.trim(),
    };

    // @ts-ignore
    dispatch(addProductAction(newProduct));

  };

  return (
    <Container className={styles.container}>
      <div className={styles.formContainer}>
        <Typography variant="h2" component="h2" className={styles.title}>
          Add Product
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            className={styles.input}
            label="Product Name"
            name="productName"
            value={productName}
            onChange={handleProductNameChange}
          />
          <TextField
            className={styles.input}
            label="Price"
            name="price"
            value={price}
            onChange={handlePriceChange}
         />
        <TextField
            className={styles.input}
            label="Amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <TextField
            className={styles.input}
            label="Description"
            name="description"
            multiline
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
          />
          <Button type="submit" variant="contained" className={styles.button}>
            Add Product
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AddProductForm;
