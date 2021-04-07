import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Login from './componets/auth/Login';
import Register from './componets/auth/Register';
import { store, persistor } from './redux/store';
import Dashboard from './componets/main/home/Dashboard';
import PrivateRoute from './componets/private/PrivateRoute';
import Navbar from './componets/layouts/Navbar';
import FilteredTable from './componets/main/table-elements/table/FilteredTable';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Navbar />
          <div className='App container'>
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/leaves/:status/:type'
                component={FilteredTable}
              />
              <Route exact path='/' component={Login} />
              <Route exact path='/sign-in' component={Login} />
              <Route exact path='/sign-up' component={Register} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
