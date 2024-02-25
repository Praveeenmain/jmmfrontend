import React from 'react';
import {Switch } from 'react-router-dom';
import LoginForm from "./components/Login"
import SignupForm from "./components/Signup"
import Home from "./components/Home"
import ProtectedRoute from './components/ProtectedRoute';
import PrivateRoute from './components/PrivateRoute';
import './App.css'
const App = () => {
  return (
    <Switch>
    <PrivateRoute exact path="/login" component={LoginForm} />
    <PrivateRoute exact path="/signup" component={SignupForm} />
      <ProtectedRoute  path="/" component={Home} />
    </Switch>
  );
}

export default App;
