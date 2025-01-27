
import { Navigate, Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home.js'
import Login from './page/Login.js';
import Signup from './page/Signup.js';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler.js';


function App() {
  const [isAuthenticated,SetisAuthenticated] = useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to='/login'/>
  }
  return (
    <div className="App">
      <RefreshHandler SetisAuthenticated={SetisAuthenticated}/>
      <Routes>
      <Route path ='/' element={<Navigate to= "/login"/>}/>
        <Route path ='/login' element={<Login/>}/>
        <Route path ='/signup' element={<Signup/>}/>
        <Route path ='/home' element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
