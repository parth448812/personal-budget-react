import React from 'react';
//import './App.css';
import './App.scss';

import{
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import DashboardPage from './DashboardPage/DashboardPage';
import ConfigurePage from './ConfigurePage/ConfigurePage';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className="App">
      <Router>
      <Menu/>
      <Hero/>
            {/* <div class="mainContainer">
                <Switch>
                  <Route path="/about">
                    <AboutPage/>
                  </Route>
                  <Route path="/login">
                    <LoginPage/>
                  </Route>
                  <Route path="/">
                    <HomePage/>
                  </Route>
                  
                </Switch>
            </div> */}
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/dashboard' element={<DashboardPage/>} />
        <Route path='/configure' element={<ConfigurePage/>} />
        
      </Routes>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
