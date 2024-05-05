import React, { useEffect, useState } from 'react';

const Token = () => {
  const [tokenExpiresIn, setTokenExpiresIn] = useState(0);

  useEffect(() => {
    
    const expirationTimeInSeconds = localStorage.getItem('expirationTimeInSeconds');
    const parsedExpirationTime = expirationTimeInSeconds ? parseInt(expirationTimeInSeconds, 10) : 60;

    const countdownInterval = setInterval(() => {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const remainingTime = parsedExpirationTime - currentTimeInSeconds;

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        alert('Token has expired. Please refresh the page.');
        return;
      }

      setTokenExpiresIn(remainingTime);

      if (remainingTime <= 20) {
        console.log('Token will expire in 20 seconds');
      }

      if (remainingTime === 0) {
        clearInterval(countdownInterval);
        alert('Token has expired. Please refresh the page.');
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const refreshPage = () => {
    const newExpirationTime = (Date.now() / 1000 + 60).toString();
    localStorage.setItem('expirationTimeInSeconds', newExpirationTime);
    setTokenExpiresIn(60); 
    window.location.reload();
  };

// const [tokenExpiresIn, setTokenExpiresIn] = useState(0);
//   let timeout;

//   const refreshToken = () => {
//     const newExpirationTime = Math.floor(Date.now() / 1000) + 60;
//     localStorage.setItem('expirationTimeInSeconds', newExpirationTime);
//     setTokenExpiresIn(60); 
//     clearTimeout(timeout);
//     startTokenTimeout();
//   };

//   const startTokenTimeout = () => {
//     timeout = setTimeout(() => {
//       alert('Token has expired. Please refresh the page.');
//       clearTimeout(timeout);
//     }, 20000); // Expire after 20 seconds of inactivity
//   };

//   useEffect(() => {
//     refreshPage();
//     document.addEventListener('click', refreshPage);

//     return () => {
//       clearTimeout(timeout);
//       document.removeEventListener('click', refreshPage);
//     };
//   }, []);


  return (
    <div className="token-info">
        <p>Token expires in: {tokenExpiresIn} seconds</p>
        <button onClick={refreshPage}>Refresh</button>
    </div>
  );
};

export default Token;