import React, {useState, useEffect, EffectCallback, SyntheticEvent} from 'react';
import './App.css';
import Auth from './Components/Auth/Auth';
import Profile from './Components/Profile/Profile';
import Navigation from './Components/Navigation/Navigation';
import {IData} from './Components/Interfaces';



function App() {

  const [sessionToken, setSessionToken] = useState('');
  const [userId, setUserId] = useState('');
  const [admin, setAdmin] = useState(false);

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(String(localStorage.getItem('token')));
    }
  }, []);


    // const thingOne =((newToken: any) => {
    //       setSessionToken(newToken);
    // })
  

  const updateToken = (newToken: string) => {
    console.log(newToken);
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }
  
  const setUser = (data: IData) => {
    console.log(data);
    localStorage.setItem('id', data.user.id);
    localStorage.setItem('admin', data.user.admin);
    // setUserId(data.user.id);
    // setAdmin(data.user.admin);
  }

  console.log(sessionToken);
  console.log(userId);
  console.log(admin);

  // const thing: boolean = false;

  const protectedViews = () : any => {
    return (sessionToken === localStorage.getItem('token') && localStorage.getItem('token') != undefined ? <Navigation token={sessionToken} userId={userId} admin={admin} clearToken={clearToken} /> : <Auth setUser={setUser} clearToken={clearToken} updateToken={updateToken}/>)
  };

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {protectedViews()}
      {/* </header> */}
    </div>
  );
}

export default App;
