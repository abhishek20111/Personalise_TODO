import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from './component/Auth';
import Todo from './component/Todo';
import { addToken } from './reducer/authReducer';

function App() {
  const token = useSelector((state)=>state.user.token);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(addToken());
  },[])
  
  return (
    <>
    <h1>Starting</h1>
    {
      token? <Todo/>: <Auth/>
    }
    </>
  );
}

export default App;
