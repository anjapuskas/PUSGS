import React from 'react';
import styles from './HomeForm.module.css';
import { logout } from 'slices/userSlice';
import { useDispatch } from 'react-redux';

const HomeForm = () => {
  const dispatch = useDispatch();
  const handleProfileClick = () => {
    // Handle profile click
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>My Website</div>
        <div className={styles.menu}>
          <button className={styles.profileButton} onClick={handleProfileClick}>
            Profile
          </button>
          <button className={styles.logoutButton} onClick={handleLogoutClick}>
            Logout
          </button>
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