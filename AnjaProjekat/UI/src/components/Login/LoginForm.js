import React, { useState } from 'react';
import styles from "../Login/LoginForm.module.css";
import { useDispatch } from 'react-redux';
import { homeAction, loginAction } from 'slices/userSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    const request = {
      username: username.toString().trim(),
      password: password.toString().trim(),
    };

  // @ts-ignore
  dispatch(loginAction(request));
  };

  
  const handleHomeSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here

  // @ts-ignore
  dispatch(homeAction());
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
        <form onSubmit={handleHomeSubmit} className={styles.form}>
{/*         <p className={styles.registrationLink}>
          Don't have an account? <a href="/register">Register here</a>
        </p> */}
        <button type="submit" className={styles.button}>Home</button>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
