import React, { useState } from 'react';
import styles from './RegistrationForm.module.css';
import { Button, Container, Link, TextField, Typography, Select, MenuItem } from '@mui/material';
import { DatePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { registerAction } from 'slices/userSlice';

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  };

  const [date, setDate] = useState(null);
  const [isDateValid, setIsDateValid] = useState(false);
  const [isDateTouched, setIsDateTouched] = useState(false);
  const [userRole, setUserRole] = useState(0); // Default user role is set to ADMIN

  const dateChangeHandler = (value) => {
    setDate(value);
    setIsDateTouched(true);
    setIsDateValid(value < new Date());
  };

  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const handleSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordRepeat = formData.get('passwordRepeat');
    const address = formData.get('address');

    if (
      username == null ||
      firstName == null ||
      lastName == null ||
      email == null ||
      password == null ||
      passwordRepeat == null ||
      address == null
    ) {
      return;
    }

    if (password !== passwordRepeat) {
      toast.error('Passwords do not match', {
        position: 'top-center',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return;
    }

    event.preventDefault();

    const request = {
      username: username.toString().trim(),
      firstName: firstName.toString().trim(),
      lastName: lastName.toString().trim(),
      email: email.toString().trim(),
      password: password.toString().trim(),
      address: address.toString().trim(),
      dateOfBirth: date,
      userRole: userRole,
    };

    // @ts-ignore
    dispatch(registerAction(request));
  };

  return (
    <Container className={styles.container}>
      <div className={styles.formContainer}>
        <Typography variant="h2" component="h2" className={styles.title}>
          Registration Form
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            className={styles.input}
            label="Username"
            name="username"
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            className={styles.input}
            label="First Name"
            name="firstName"
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            className={styles.input}
            label="Last Name"
            name="lastName"
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            className={styles.input}
            label="Email"
            name="email"
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            className={styles.input}
            label="Password"
            name="password"
            type="password"
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            className={styles.input}
            label="Repeat Password"
            name="passwordRepeat"
            type="password"
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            className={styles.input}
            label="Address"
            name="address"
            onChange={handleInputChange}
          />
          <DesktopDatePicker
            format="dd/MM/yyyy"
            // @ts-ignore
            fullWidth
            disableFuture
            label="Birthday"
            error={isDateTouched && !isDateValid}
            onChange={(value) => dateChangeHandler(new Date(value))}
          />
          <Select
            className={styles.input}
            label="User Role"
            value={userRole}
            onChange={handleUserRoleChange}
          >
            <MenuItem value={1}>Seller</MenuItem>
            <MenuItem value={2}>Buyer</MenuItem>
          </Select>
          <Button type="submit" variant="contained" className={styles.button}>
            Register
          </Button>
        </form>
        <div className={styles.registrationLink}>
          <Typography variant="body1" component="span">
            Already have an account?{' '}
          </Typography>
          <Link href="/login" className={styles.link}>
            Login here
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default RegistrationForm;
