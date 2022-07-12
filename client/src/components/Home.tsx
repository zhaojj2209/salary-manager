import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { UserTable } from '.';

const Home: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(Number.POSITIVE_INFINITY);

  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        px: { xs: 2, sm: 4 },
      }}
    >
      <Typography variant='h5' sx={{ pb: 5 }}>
        List of employees
      </Typography>
      <UserTable offset={offset} minSalary={minSalary} maxSalary={maxSalary} />
    </Container>
  );
};

export default Home;
