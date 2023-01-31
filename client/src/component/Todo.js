import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, deleteTodo, fetchTodo } from '../reducer/todoReducer';
import { logout } from '../reducer/authReducer';

export default function Todo() {
    const [myTodo, setTodo] = useState("");
    const dispatch = useDispatch();
    
    const todos = useSelector(state=>state.todos);

    const addTodo =()=>{
        dispatch(createTodo({todo:myTodo}))
    }

    useEffect(()=>{
        dispatch(fetchTodo())
    },[])

  return (
    <>
        <input type="text"
        placeholder='Enter your wish'
        onChange={(e)=>setTodo(e.target.value)}
        value={myTodo} />
        <br />
        <button className='btn' 
        onClick={()=>addTodo()} >Add Wish</button>
        <br />
        <ul>
            {
                todos.map(item=>{
                    return <li className='collection-item' 
                    key = {item._id} 
                    onClick = {()=>dispatch(deleteTodo(item._id))}
                    >{item.todo}</li>
                })
            }
        </ul>
        <button className='btn' 
        onClick={()=>dispatch(logout())} >Logout</button>
    </>
  )
}
