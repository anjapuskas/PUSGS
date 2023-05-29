import AppRoutes from 'routes/AppRoutes';
import './App.css';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AppRoutes/>
    </LocalizationProvider>
  );
}

export default App;
