import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './Components/Auth/Auth';
import Navigation from './Components/Navigation/Navigation';
import GamesIndex from './Components/Profile/MyGames/GameIndex';

function App() {

  const thing: string = '12';

  const protectedViews = () => {
    return (thing == '12' ? <GamesIndex /> : <Auth />)
  }

  return (
    <div className="App">
      <header className="App-header">
      {protectedViews()}
      <Navigation />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
