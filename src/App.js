import React from 'react';
import './App.css';
import logo from './logo.webp';
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from 'react-router-dom';
import './bootstrap/dist/css/bootstrap.css';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import ProfilePage from './components/ProfilePage';
import RegPage from './components/RegPage';
import PerformancePage from './components/PerformancePage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import Navbar from './components/Navbar';
import Sem1Chart from "./components/Charts/Sem1Chart";
import Sem2Chart from "./components/Charts/Sem2Chart"
import Sem3Chart from "./components/Charts/Sem3Chart"
import Sem4Chart from "./components/Charts/Sem4Chart"
import { useState ,useEffect} from 'react';
import { useUser  } from './context/UserContext'; 

function App() {
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const { user, handleLogin } = useUser();

  const [loading, setLoading] = useState(true);

  // Load user data from localStorage when the component mounts
 
  console.log(user);
 
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      //console.log(userData);
      handleLogin(userData);
      console.log(user);
    }
    setLoading(false);
  }, []);

  // Save user data to localStorage whenever it changes
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="image-container">
    <Router>
      
      <div className="container-fluid p-0">
     
      <nav className="navbar-container">
  <div className="navbar-date">{formattedDate}</div>
  <div className="navbar-logo"> <img src={logo} alt="Background" className="logo-image" /></div>
  <ul className="navbar-items">
    <li className="navbar-item">
      <Link to="/" className="navbar-link">
        Home
      </Link>
    </li>
  {  user.username!=null?
  (<div style={{display:'flex',flexDirection:'row'}}><li className="navbar-item">

<Link to="/login" className="navbar-link">
        Student
      </Link>
      </li>
      <li className="navbar-item">
        <Link to='/' onClick = {() => {handleLogin(null);
                                      localStorage.removeItem('userData');}} className="navbar-link">
        Logout
      </Link>
      
    </li>
    </div>):
    (<li className='navbar-item'>
    <Link to="/login"onClick={() => { if(user.username){
                                              console.log(user);
                                              console.log("anand");
                                              localStorage.setItem('userData', JSON.stringify(user));
                                              }   }} className="navbar-link">
        Student
      </Link>
    </li>)
    }
    
    <li className="navbar-item">
      <Link to="/admin" className="navbar-link">
        Admin
      </Link>
    </li>
    <li className="navbar-item dropdown">
      <a
        className="navbar-link"
        href="/"
        id="navbarDropdown"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Contact Us
      </a>
      <ul className="dropdown-menu" aria-labelledby="tel:9959336622">
        <li>
          <a className="dropdown-item" href="/">
            Phone: 099598 34090
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="mailto:web@cvr.ac.in">
            Email: web@cvr.ac.in
          </a>
        </li>
      </ul>
    </li>
  </ul>
</nav>

        <Switch>
          <Route path="/" exact>
            <WelcomePage />
          </Route>
          <Route path="/login">
          {user.username!=null ? (
            <Redirect to={`/profile-page?roll=${user.username}`} />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )}
        </Route>
        <Route path="/profile-page">
          {user.username!=null ? <ProfilePage onLogin={handleLogin}/> : <Redirect to="/login" />}
        </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordPage />
          </Route>
          <Route path="/registration-page">
            <RegPage />
          </Route>
          <Route path="/performance-page">
            <PerformancePage />
          </Route>
          <Route path="/navbarcharts">
            <Navbar />
          </Route>
          <Route path="/sem1-chart">
              <Navbar />
              <Sem1Chart />
          </Route>
          <Route path="/sem2-chart">
               <Navbar />
              <Sem2Chart />
          </Route>
          <Route path="/sem3-chart">
              <Navbar />
              <Sem3Chart />
          </Route>
          <Route path="/sem4-chart">
              <Navbar />
              <Sem4Chart />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
