import { Container, Typography } from '@mui/material';
import React from 'react';

const Header: React.FC = () => {
  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: { xs: 2, sm: 4 },
      }}
    >
      <Typography variant='h3'>
        Salary Manager
      </Typography>
    </Container>
  );
};

export default Header;
