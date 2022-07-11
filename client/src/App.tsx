import React from 'react';
import { CssBaseline } from '@mui/material';
import { Layout } from './layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Upload } from './components';

const App: React.FC = () => (
  <BrowserRouter>
    <CssBaseline />
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
