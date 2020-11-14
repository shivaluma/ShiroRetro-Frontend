/* eslint-disable react/display-name */
import React, { memo } from 'react';
import Layout from '../components/Layout/Layout';

const useLayout = ([left, right]) => {
  return memo(({ children }) => (
    <Layout leftHeader={left} rightHeader={right}>
      {children}
    </Layout>
  ));
};

export default useLayout;
