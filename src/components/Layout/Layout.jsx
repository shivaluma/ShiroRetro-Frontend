import React from 'react';
import Header from './components/Header';

const Layout = ({ children, leftHeader, rightHeader }) => {
  return (
    <main className="flex flex-col flex-1 h-screen max-h-screen overflow-y-hidden">
      <Header leftChild={leftHeader} rightChild={rightHeader} />
      {children}
    </main>
  );
};

export default Layout;
