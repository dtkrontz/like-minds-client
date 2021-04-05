import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './Components/Auth/Auth';
import Profile from './Components/Profile/Profile';



function App() {

  const [sessionToken, setSessionToken] = useState('');

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     setSessionToken((localStorage.getItem('token')));
  //   }
  // }, []);


    // const thingOne =((newToken: any) => {
    //       setSessionToken(newToken);
    // })
  

  const updateToken = (newToken: any) => {
    console.log(newToken);
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }
  
  console.log(sessionToken);

  const thing: boolean = false;

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') && localStorage.getItem('token') != undefined ? <Profile token={sessionToken} /> : <Auth clearToken={clearToken} updateToken={updateToken}/>)
  };

  return (
    <div className="App">
      <header className="App-header">
      {protectedViews()}
      </header>
    </div>
  );
}

export default App;
