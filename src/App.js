import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Googlemap from './components/Googlemap';
import Login from './components/Login';
import Signin from './view/Signin';
import Singup from './view/Singup';
import Home from './view/Home';
import VerifyOtp from './view/VerifyOtp';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/register' element={<Singup/>}/>
        <Route path='/verifyotp' element={<VerifyOtp/>}/>
        <Route path='/map' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
