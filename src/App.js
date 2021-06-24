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
import PaperAuthorPage from './components/PaperAuthorPage.js'
import { FuegoProvider } from "@nandorojo/swr-firestore";
import firebase from 'firebase/app';


export const AuthContext = React.createContext(null);

function App() {

  class CustomFuego {
    // db;
    // auth;
    // functions;
  
    constructor() {
      this.db = firebase.firestore();
      this.auth = firebase.auth;
      // this.functions = functions;
    }
  }
  
  const fuego = new CustomFuego();


  const [loggedIn, setLoggedIn] = useState(false);
  document.title="Plaza"
  
  return(
    <>
      <FuegoProvider fuego={fuego}>
        <AuthProvider>
          <Router>
            <div>
              <Switch>
                <Route path='/' exact component={LandingPage} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <PrivateRoute path='/profile' component={Profile} />
                <PrivateRoute path='/upload' component={Upload} />
                <PrivateRoute path='/search' component={Search} />
                <PrivateRoute path="/:id" exact={true} children={<Child />} />
                <PrivateRoute path="/author/:uid" exact={true} children={<AuthorPage />} />
              </Switch>
            </div>
          </Router>
        </AuthProvider>
      </FuegoProvider>
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


function AuthorPage() {
  let {uid} = useParams();
  return(
    <>
      <PaperAuthorPage uid={uid}/>
    </>
  )
}