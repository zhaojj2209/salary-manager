import styled from '@emotion/styled';
import { Alert, Button, Snackbar, SnackbarCloseReason, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';

const FileInput = styled('input')(() => ({
  fontSize: 18,
}));

const Upload: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setDomain(process.env.REACT_APP_BACKEND_URL ?? '');
  }, []);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    setSelectedFile(event.target.files[0]);
  };

  const submitFile = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const apiUrl = `${domain}/users/upload`;
      const options = {
        method: 'POST',
        body: formData,
      };

      fetch(apiUrl, options)
        .then(async (response) => {
          if (!response.ok) {
            console.error(response);
            showToastMessage(true);
          } else {
            showToastMessage(false);
          }
        })
        .catch(() => showToastMessage(false));
      }
  };

  const showToastMessage = (isError: boolean) => {
    setIsError(isError);
    setShowToast(true);
  };

  const handleClose = (
    event: Event | React.SyntheticEvent,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowToast(false);
  };

  return (
    <Container
      maxWidth='lg'
      sx={{ px: { xs: 2, sm: 4 } }}
    >
      <Typography variant='h5' sx={{ pb: 4 }}>
        Upload employee data
      </Typography>
      <FileInput
        accept='.csv'
        type='file'
        onChange={selectFile}
      />
      <Button variant='contained' onClick={submitFile}>
        Upload
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showToast}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={isError ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {isError ? 'An error occurred' : 'Upload Successful'}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Upload;
