import React, {useState} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/pages/Login.js';
import Register from './components/pages/Register.js';
import LandingPage from './components/pages/LandingPage.js';
import Dashboard from './components/pages/Dashboard';
import { AuthProvider } from './components/navigation/AuthProvider';
import PrivateRoute from './components/navigation/PrivateRoute.js';
import Profile from './components/pages/Profile';

export const AuthContext = React.createContext(null);

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  
  
  return(
    <>
        <AuthProvider>
          <Router>
            <div>
              <Route path='/' exact component={LandingPage} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <PrivateRoute path='/profile' component={Profile} />
            </div>
          </Router>
        </AuthProvider>
    </>
  )
}


export default App;