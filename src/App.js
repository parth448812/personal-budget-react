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
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
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
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        
      </Routes>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
