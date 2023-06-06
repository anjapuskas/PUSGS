import React, { useEffect, useState } from 'react';
import styles from './ProfileForm.module.css';
import { Button, Container, TextField, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { toast } from 'react-toastify';

import { profileAction, profileImageAction } from 'slices/userSlice';
import ImageUploader from 'components/Shared/ImageUploader';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from 'components/Navigation/Navigation';

const ProfileForm = () => {
    const dispatch = useDispatch();
    const handleInputChange = (event) => {
        const { name, value } = event.target;
      };
    
    // @ts-ignore
    const user = useSelector((state) => state.user.user);
    const [date, setDate] = useState(null);
    const [isDateValid, setIsDateValid] = useState(false);
    const [isDateTouched, setIsDateTouched] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (user.dateOfBirth) {
          setDate(new Date(user.dateOfBirth));
        }
//        if (user.image) {
            // @ts-ignore
  //          dispatch(profileImageAction(user.id));
    //      }
      }, [user.dateOfBirth]);
    
    const dateChangeHandler = (value) => {
        setDate(value);
        setIsDateTouched(true);
        setIsDateValid(value < new Date());
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const handleSubmit = (event) => {

        const formData = new FormData();
        formData.append('id', user.id);
        formData.append('firstName', event.target.firstName.value);
        formData.append('lastName', event.target.lastName.value);
        formData.append('address', event.target.address.value);
        formData.append('dateOfBirth', date.toISOString());
        formData.append('image', selectedImage);

        
        // @ts-ignore
        dispatch(profileAction(formData));
    };
      
    return (
      <>
      <Navigation/>
      <Container className={styles.container}>
        <div className={styles.formContainer}>
          <Typography variant="h2" component="h2" className={styles.title}>
            Profile
          </Typography>
          <form className={styles.form} onSubmit={handleSubmit}>
          <ImageUploader
          selectedImage={selectedImage ? selectedImage : user.imageSrc}
          handleImageChange={handleImageChange}
        />
            <TextField
              margin="normal"
              className={styles.input}
              label="First Name"
              name="firstName"
              defaultValue={user.firstName}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              className={styles.input}
              label="Last Nassme"
              name="lastName"
              defaultValue={user.lastName}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              className={styles.input}
              label="Address"
              name="address"
              defaultValue={user.address}
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
                  value = {date}
                />
            <Button
              type="submit"
              variant="contained"
              className={styles.button}
            >
              Update
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default ProfileForm;

