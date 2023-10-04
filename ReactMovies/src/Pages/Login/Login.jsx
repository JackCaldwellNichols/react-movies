import React, {useContext, useRef, useState} from 'react'
import './login.scss'
import {Link} from 'react-router-dom'
import { login } from '../../Context/AuthContext/APICalls'
import logo from '../../assets/newLogo.png'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext/AuthContext'



const Login = () => {
    const {isFetching, dispatch, error} = useContext(AuthContext)
    
    const userRef = useRef()
    const passwordRef = useRef()
    const [message, setMessage] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
          login({username: userRef.current.value, password: passwordRef.current.value}, dispatch, setMessage)
    }

  return (

    <div className='login'>
      <div className="top">
        <div className="wrapper">
            <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="bottom">
      <form  onSubmit={handleSubmit}>
        <h1>Sign in.</h1>
        <input type='username' placeholder='Username' ref={userRef} required/>
        <input type="password" placeholder='Password' ref={passwordRef} required/>
        <button type='submit' disabled={isFetching}>
          Log in
        </button>
        
        <span>Not signed up? Click <Link className='link' to='/register'>here.</Link></span>
        {error && <p style={{color: 'red', textAlign: 'center'}}>{message}</p>}
      </form>
      </div>
    </div>

  )
}

export default Login