import { Container, Typography } from '@mui/material';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <Container
      maxWidth='lg'
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 3,
      }}
    >
      <Typography variant='body1'>
        Website by Zhao Jingjing
      </Typography>
    </Container>
  );
};

export default Footer;
