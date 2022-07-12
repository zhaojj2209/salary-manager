import { Box, Container, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { UserTable } from '.';

const Home: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [inputMinSalary, setInputMinSalary] = useState('');
  const [inputMaxSalary, setInputMaxSalary] = useState('');
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(Number.POSITIVE_INFINITY);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      changeMinSalary();
      changeMaxSalary();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputMinSalary, inputMaxSalary]);

  const changeMinSalary = () => {
    const salary = parseFloat(inputMinSalary);
    if (salary) {
      setMinSalary(salary);
    }
  };

  const changeMaxSalary = () => {
    const salary = parseFloat(inputMaxSalary);
    if (salary) {
      setMaxSalary(salary);
    }
  };

  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        px: { xs: 2, sm: 4 },
      }}
    >
      <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' pb={2}>
        <Typography variant='h5'>
          List of employees
        </Typography>
        <Box display='flex' flexDirection='row' alignItems='center'>
          <Typography variant='body1' sx={{ px: 4 }}>
            Filter by salary range:
          </Typography>
          <TextField
            label='From'
            variant='outlined'
            type='number'
            value={inputMinSalary}
            onChange={(event) => setInputMinSalary(event.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ mx: 2 }}
          />
          <TextField
            label='To'
            variant='outlined'
            type='number'
            value={inputMaxSalary}
            onChange={(event) => setInputMaxSalary(event.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Box>
      </Box>
      <UserTable offset={offset} minSalary={minSalary} maxSalary={maxSalary} />
    </Container>
  );
};

export default Home;
