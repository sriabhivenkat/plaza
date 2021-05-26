import React, {useState, useEffect} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom';
import Login from './components/pages/Login.js';
import Register from './components/pages/Register.js';
import LandingPage from './components/pages/LandingPage.js';
import Dashboard from './components/pages/Dashboard';
import { AuthProvider } from './components/navigation/AuthProvider';
import PrivateRoute from './components/navigation/PrivateRoute.js';
import Profile from './components/pages/Profile';
import Upload from './components/pages/Upload';
import Search from './components/pages/Search';
import PaperPageComp from './components/PaperPageComp.js'




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
              <Switch>
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <PrivateRoute path='/profile' component={Profile} />
                <PrivateRoute path='/upload' component={Upload} />
                <PrivateRoute path='/search' component={Search} />
                <Route path="/:id" exact={true} children={<Child />} />
              </Switch>
            </div>
          </Router>
        </AuthProvider>
    </>
  )
}
export default App;

function Child() {

  let {id} = useParams();
  return(
    <>
      <PaperPageComp  id={id}/>
    </>
  );
}