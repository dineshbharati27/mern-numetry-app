import './App.css';
import { Routes, Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import Login from './pages/Login';
import Home from './pages/Home';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
