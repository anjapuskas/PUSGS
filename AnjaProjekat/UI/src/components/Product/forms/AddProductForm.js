import styles from './AddProductForm.module.css';
import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { DatePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { useDispatch } from 'react-redux';
import { addProductAction } from 'slices/productSlice';
import Navigation from 'components/Navigation/Navigation';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null);

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

    const formData = new FormData(event.currentTarget);
    formData.append('pictureFile', picture);
    event.preventDefault();

    // @ts-ignore
    dispatch(addProductAction(formData));

  };

  return (
    <>
    <Navigation/>
    <Container className={styles.container}>
      <div className={styles.formContainer}>
        <Typography variant="h2" component="h2" className={styles.title}>
          Add Product
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            className={styles.input}
            label="Product Name"
            name="name"
            value={productName}
            onChange={handleProductNameChange}
          />
          <TextField
            margin="normal"
            className={styles.input}
            label="Price"
            name="price"
            value={price}
            onChange={handlePriceChange}
         />
        <TextField
            margin="normal"
            className={styles.input}
            label="Amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <TextField
            margin="normal"
            className={styles.input}
            label="Description"
            name="description"
            multiline
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
          />
          <div>
            <label>Picture:</label>
            <input type="file" accept="image/*" onChange={(e) => setPicture(e.target.files[0])} />
          </div>
          <Button type="submit" variant="contained" className={styles.button}>
            Add Product
          </Button>
        </form>
      </div>
    </Container>
    </>
  );
};

export default AddProductForm;
