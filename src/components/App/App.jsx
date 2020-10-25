import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Boards from '../../pages/Boards/Boards';
import '../../styles/tailwind.css';

import { Login } from '../../pages/Login';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Boards} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
