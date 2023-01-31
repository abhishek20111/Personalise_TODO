import React, { useState } from 'react'
import {signupUser, signinUser} from '../reducer/authReducer' 
import {useDispatch, useSelector} from 'react-redux'

export default function Auth() {
    const {loading, error} = useSelector(state =>state.user)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState('signin');
    const dispatch = useDispatch();

    const Authanticte=()=>{
        if(auth === 'signin'){
            dispatch(signinUser({email, password}))
        }else{
            dispatch(signupUser({email, password}))
        }
    }
  return (
    
    <div>

    {loading &&
      <div class="preloader-wrapper active">
      <div class="spinner-layer spinner-red-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>}

      <h1>Please {auth}</h1>

        {error && <h1>{error}</h1>}


        <input type="email"
        value={email} 
        onChange={(e)=>setEmail(e.target.value)} 
        />
        <br />
        <br />
        <input type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)} 
        />
        {
            auth === 'signin'?
            <h6 onClick={()=> setAuth('signup')}>Dont have account</h6>:
            <h6 onClick={()=> setAuth('signin')}>Already have acount</h6>
        }

        <button className='btn' onClick={()=>Authanticte()}>{auth}</button>

    </div>
  )
}
