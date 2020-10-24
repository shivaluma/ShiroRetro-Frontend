import React from 'react';
import Header from './components/Header';

const Layout = ({ children }) => {
  return (
    <main className="relative w-full">
      <Header
        leftChild={() => (
          <div className="ml-2 text-xl font-medium text-gray-800">Boards</div>
        )}
      />
      {children}
    </main>
  );
};

export default Layout;
