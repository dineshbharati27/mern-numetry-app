import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const [name, setName ] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [password, setPassword ] = useState("");
  const [email, setEmail ] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        if (password !== firstPassword) {
          toast.error("Password not match");
        } else {
          const formData = new FormData();
          formData.append('name', name);
          formData.append('email', email);
          formData.append('password', password);
          if (profileImage) {
            formData.append('profileImage', profileImage);
          }

          const response = await axios.post('http://localhost:3001/api/user/register', formData);
          if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
          } else {
            toast.error(response.data.message);
          }
        }
      } else {
        const response = await axios.post('http://localhost:3001/api/user/login', { email, password });
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  },[token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl font-semibold text-gray-800'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {
        currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>
      }
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      {
        currentState === 'Sign Up' && <input onChange={(e) => setProfileImage(e.target.files[0])} type="file" className='w-full px-3 py-2 border border-gray-800' required />
      }
      {
        currentState === 'Login' ? '' : <input onChange={(e)=>setFirstPassword(e.target.value)} value={firstPassword} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter Password' required/>
      }
      {
        currentState === 'Login' ? <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/> : <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Confirm Password' required/>
      }

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password?</p>
          {
            currentState === 'Login' 
            ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p> 
            : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
          }
      </div>
      <button className='bg-black text-white py-2 mt-4 px-8 font-light'>{
        currentState === 'Login' ? 'Sign In' : 'Sign Up'
      }</button>
    </form>
  );
};

export default Login;
