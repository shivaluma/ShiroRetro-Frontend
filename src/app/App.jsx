import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Boards from '../pages/Boards/Boards';
import '../styles/tailwind.css';
import ProtectedRoute from '../components/ProtectedRoute';
import { initUserLoading } from './slices/userSlice';
import { changeLoading } from './slices/loadingSlice';
import Loading from '../components/Loading';

const App = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.loading);
  useEffect(() => {
    (async function init() {
      await dispatch(initUserLoading());
      await dispatch(changeLoading());
    })();
  }, [dispatch]);

  return isLoading ? (
    <Loading />
  ) : (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={Boards} />
        {/* <Route exact path="/login" component={Auth} />
        <Route exact path="/register" component={Auth} /> */}
      </Switch>
    </Router>
  );
};

export default App;
