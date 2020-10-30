import React, { useEffect, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Boards from '../pages/Boards/Boards';
import '../styles/tailwind.css';
import ProtectedRoute from '../components/ProtectedRoute';
import { initUserLoading } from './slices/userSlice';
import { changeInit } from './slices/initSlice';
import Loading from '../components/Loading';
import Board from '../pages/Board/Board';
import { Auth } from '../pages/Auth';

// const Board = lazy(() => import('../pages/Board/Board'))

const App = () => {
  const dispatch = useDispatch();

  const isInit = useSelector((state) => state.init);
  useEffect(() => {
    (async function init() {
      await dispatch(initUserLoading());
      await dispatch(changeInit());
    })();
  }, [dispatch]);

  return isInit ? (
    <Loading />
  ) : (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={Boards} />
        <ProtectedRoute path="/b/:idBoard" component={Board} />
        <Route exact path="/login" component={Auth} />
      </Switch>
    </Router>
  );
};

export default App;
