import React from 'react';
import Header from './components/Header';

const Layout = ({ children, leftHeader, rightHeader }) => {
  return (
    <main className="relative w-full">
      <Header leftChild={leftHeader} rightChild={rightHeader} />
      {children}
    </main>
  );
};

export default Layout;
