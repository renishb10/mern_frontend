import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from "./utilities/setAuthToken";

import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Footer from './components/layouts/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';
import { setCurrentUser, logoutUser } from './actions/authActions';

//Check for token
if (localStorage.jwtToken) {
  //Set authorization header for further request
  setAuthToken(localStorage.jwtToken);

  //Decode token and get the user data
  const decodedUserData = jwt_decode(localStorage.jwtToken);

  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decodedUserData));

  //Check for token expiration
  const currentTime = Date.now() / 1000;
  if (decodedUserData.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());

    //Redirect to login page
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing } />
            <div className="container">
              <Route exact path="/register" component={ Register } /> 
              <Route exact path="/login" component={ Login } />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
