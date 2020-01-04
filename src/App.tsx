import React from 'react';
import { Store } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import { Provider } from 'react-redux';
import storeConfig from './store';

import LoginPage from './pages/login';
import SearchPage from './pages/search'

import { IApplicationState } from './interfaces/IApplicationState';

import './App.css';

class App extends React.Component {
  render() {
    const store: Store<IApplicationState> = storeConfig();
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute path="/search" component={SearchPage} />
        </Router >
      </Provider>
    );
  }
}

export default App;
