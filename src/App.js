import React from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/pages/Login.js';
import Register from './components/pages/Register.js';
import Home from './components/pages/Home.js';

function App() {
  return(
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </Router>
    </>
  )
}


export default App;