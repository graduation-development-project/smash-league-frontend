'use client';
import AdminCard from '@/components/general/molecules/admin/admin.card';
import { BarChart } from '@mui/x-charts';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TransactionChartMUI from '../transactions/transactions-chart';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Material UI blue
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const AdminDashboard = () => {
  return (
    <div className="w-full h-full flex flex-col gap-7">
      <AdminCard />
      <div className="w-full h-full flex items-center justify-center">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box className="container mx-auto p-4 md:p-6 lg:p-8">
            {/* <Typography variant="h4" component="h1" className="font-bold mb-6">
              Dashboard
            </Typography> */}
            <Box className="grid grid-cols-1 gap-6">
              <TransactionChartMUI />
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default AdminDashboard;
