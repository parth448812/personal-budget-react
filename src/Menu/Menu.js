import React from 'react';
import { useNavigate } from 'react-router-dom';

import{
  Link
} from "react-router-dom";

function Menu() {
  
  const navigate = useNavigate();

  const handleLogout = () => {

    if (window.confirm('Are you sure you want to log out?')) {
    
       localStorage.clear();
       navigate('/login');
    }
  };
  
  return (
     <nav 
          className="menu"
          role="navigation"
          aria-label="Main menu"
          itemScope
          itemType="https://schema.org/SiteNavigationElement">
        <ul>
            <li><Link itemProp="url" to="/">Home</Link></li>
            <li><Link itemProp="url" to="/login">Login</Link></li>
            {/* <li><Link itemProp="url" to="/signup">Signup</Link></li> */}
            <li><Link itemProp="url" to="/dashboard">Dashboard</Link></li>
            <li><Link itemProp="url" to="/configure">Configure</Link></li>
            <li><Link itemProp="url" to="/login" onClick={handleLogout}>Logout</Link></li>  {/* code to logout and redirect to homepage */}
           
        </ul>
    </nav>
         );
}

export default Menu;