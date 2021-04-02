import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './Components/Auth/Auth';
import Navigation from './Components/Navigation/Navigation';
import Profile from './Components/Profile/Profile';

function App() {

  const thing: string = '12';

  const protectedViews = () => {
    return (thing == '12' ? <Profile /> : <Auth />)
  };

  return (
    <div className="App">
      <header className="App-header">
      {protectedViews()}
      <Navigation />
      </header>
    </div>
  );
}

export default App;
