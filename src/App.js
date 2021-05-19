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
import firebase from 'firebase/app';
import Search from './components/pages/Search';




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
              <PrivateRoute path='/upload' component={Upload} />
              <PrivateRoute path='/search' component={Search} />


              <Switch>
                <Route path="/:id" children={<Child />} />
              </Switch>
            </div>
          </Router>
        </AuthProvider>
    </>
  )
}
export default App;

function Child() {
  const [pdf, setPdf] = useState("");
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [institution, setInstitution] = useState("");
  const [author, setAuthor] = useState("");
  const [abstract, setAbstract] = useState("");
  const [eli5, setEli5] = useState("");
  let {id} = useParams();
  useEffect(() => {
    const main = async() => {
      const paperData = 
        firebase
          .firestore()
          .collection("Papers")
          .doc(id);
      const paperDoc = 
        await paperData
          .get()
      const {pdfUrl1, tags, title, institution, author, abstract, easydesc } = paperDoc.data()
      setPdf(pdfUrl1);
      setTags(tags);
      setTitle(title);
      setInstitution(institution);
      setAuthor(author);
      setAbstract(abstract)
      setEli5(easydesc);
    };
    main();
  }, [])
  return(
    <>
    
    </>
  );
}