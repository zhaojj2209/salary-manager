import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

const Home: React.FC = () => {
  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        px: { xs: 2, sm: 4 },
      }}
    >
      <Typography variant='h5'>
        List of employees
      </Typography>
    </Container>
  );
};

export default Home;
