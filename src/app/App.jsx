import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Boards from '../pages/Boards/Boards';
import '../styles/tailwind.css';

// import { Auth } from '../pages/Auth';
import ProtectedRoute from '../components/ProtectedRoute';

const App = () => {
  return (
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
