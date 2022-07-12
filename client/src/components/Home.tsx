import { Box, Button, Container, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { UserTable } from '.';

const Home: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [inputMinSalary, setInputMinSalary] = useState('');
  const [inputMaxSalary, setInputMaxSalary] = useState('');
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(Number.POSITIVE_INFINITY);

  const limit = 30;

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

  const goToPreviousPage = () => {
    setOffset(Math.min(offset - limit, 0));
  };

  const goToNextPage = () => {
    setOffset(offset + limit);
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
      <Box display='flex' justifyContent='space-between' alignItems='center' pb={2}>
        <Typography variant='h5'>
          List of employees
        </Typography>
        <Box display='flex' alignItems='center'>
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
              startAdornment: <InputAdornment position='start'>$</InputAdornment>,
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
              startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            }}
          />
        </Box>
      </Box>
      <UserTable offset={offset} minSalary={minSalary} maxSalary={maxSalary} setCount={setCount} />
      <Box display='flex' justifyContent='flex-end' pt={3}>
        <Button
          variant='contained'
          disabled={offset === 0}
          sx={{ mr: 2 }}
          onClick={goToPreviousPage}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          disabled={(offset + limit) > count}
          onClick={goToNextPage}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
