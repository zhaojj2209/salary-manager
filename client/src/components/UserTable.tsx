import { Box, CircularProgress, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SortBy, SortOrder, User } from '../types';

interface Props {
  offset: number,
  minSalary: number,
  maxSalary: number,
  // eslint-disable-next-line no-unused-vars
  setCount: (count: number) => void,
}

const HeaderCellLabel = styled(TableSortLabel)(() => ({
  fontSize: 18,
  fontWeight: 700,
}));

const Home: React.FC<Props> = (props) => {
  const { offset, minSalary, maxSalary, setCount } = props;
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.ID);
  const [sortOrder, setSortOrder] = useState(SortOrder.ASC);

  const domain = process.env.REACT_APP_BACKEND_URL ?? '';
  const apiUrl = `${domain}/users`;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    if (domain.length === 0) {
      setIsError(true);
      return;
    }
    const searchParams = new URLSearchParams({
      minSalary: minSalary.toString(),
      maxSalary: maxSalary.toString(),
      sortBy: sortBy.toString(),
      sortOrder: sortOrder.toString(),
      limit: '30',
      offset: offset.toString(),
    });

    const queryUrl = `${apiUrl}?${searchParams.toString()}`;

    fetch(queryUrl)
      .then((response) => {
        if (!response.ok) {
          handleError();
        } else {
          response.json().then((data) => {
            setData(data.results ?? []);
            setCount(data.count ?? 0);
            setIsLoading(false);
          });
        }
      })
      .catch(handleError);

  }, [minSalary, maxSalary, sortBy, sortOrder, offset]);

  const handleError = () => {
    setData([]);
    setIsLoading(false);
    setIsError(true);
  };

  const handleSort = (sortKey: SortBy) => {
    if (sortKey === sortBy) {
      setSortOrder(sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    } else {
      setSortBy(sortKey);
      setSortOrder(SortOrder.ASC);
    }
  };

  const getHeaderSortOrder = () => {
    return sortOrder === SortOrder.ASC ? 'asc' : 'desc';
  };

  const headers = [
    {
      id: SortBy.ID,
      title: 'ID',
      sortKey: SortBy.ID,
    },
    {
      id: SortBy.LOGIN,
      title: 'Login',
      sortKey: SortBy.LOGIN,
    },
    {
      id: SortBy.NAME,
      title: 'Name',
      sortKey: SortBy.NAME,
    },
    {
      id: SortBy.SALARY,
      title: 'Salary',
      sortKey: SortBy.SALARY,
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: 'primary.light' }}>
          <TableRow>
            {headers.map((item, index) => (
              <TableCell key={item.id} align={index > 0 ? 'right' : 'left'}>
                <HeaderCellLabel
                  key={item.id}
                  active={sortBy === item.id}
                  direction={sortBy === item.id ? getHeaderSortOrder() : 'asc'}
                  onClick={() => handleSort(item.sortKey)}
                >
                  {item.title}
                </HeaderCellLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {data.length > 0 && (
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell align='right'>{row.login}</TableCell>
                <TableCell align='right'>{row.name}</TableCell>
                <TableCell align='right'>${row.salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
        {isLoading && (
          <CircularProgress />
        )}
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={4}>
              <Box display='flex' justifyContent='center' width='100%'>
                {isError ? 'Error loading data' : 'No entries'}
              </Box>
            </TableCell>
          </TableRow>
        )}
      </Table>
    </TableContainer>
  );
};

export default Home;
