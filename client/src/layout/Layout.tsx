import { styled } from '@mui/material';
import React from 'react';
import { Footer, Header } from './components';

interface LayoutProps {
  children?: React.ReactNode;
}

const Main = styled('main')(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
}));

const Space = styled('div')(() => ({
  flexGrow: 1,
}));

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children, ...rest } = props;

  return (
    <Main {...rest}>
      <Header />
      {children}
      <Space />
      <Footer />
    </Main>
  );
};

export default Layout;
