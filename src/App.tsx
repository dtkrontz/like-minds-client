import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './Components/Auth/Auth';
import Profile from './Components/Profile/Profile';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

function App() {

  const [sessionToken, setSessionToken] = useState(''); //1

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     setSessionToken((localStorage.getItem('token'): SetStateAction<string>);
  //   }
  // }, [])

  const updateToken = (newToken: any) => {
    console.log(newToken);
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken)
  }

  const thing: boolean = false;

  const protectedViews = () => {
    return (thing ? <Profile /> : <Auth updateToken={updateToken}/>)
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
