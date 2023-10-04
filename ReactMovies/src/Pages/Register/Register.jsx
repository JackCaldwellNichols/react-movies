import React, {useRef} from 'react'
import './register.scss'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../../assets/newLogo.png'
import { signUp } from '../../Context/AuthContext/APICalls'


const Register = () => {

    const emailRef = useRef()
    const userRef = useRef()
    const passwordRef = useRef()
    const repeatRef = useRef()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
      e.preventDefault()

      const user = {
        username: userRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      }
      try {
        signUp(user, navigate)
      } catch (error) {
        console.log(error)
      }
  
    }

  return (

    <div className='register'>
      <div className="top">
        <div className="wrapper">
            <img src={logo} alt="logo" className='logo'/>
            <button className='loginBtn'>Log In</button>
        </div>
      </div>
      <form className="bottom" onSubmit={handleSubmit}>
        <h1>The best movies and TV shows. Anywhere. Anytime.</h1>
        <p>Ready to get started? Enter your details below.</p>
        <input type='email' placeholder='Email' ref={emailRef} required/>
        <input type='username' placeholder='Username' ref={userRef} required/>
        <input type="password" placeholder='password' ref={passwordRef} required/>
        <input type="password" placeholder='Repeat password' ref={repeatRef} required/>
        <button type='submit'>
          Sign Up
        </button>
        <span>Already have an account? Click <Link className='link' to='/login'>here.</Link></span>
      </form>
    </div>

  )
}

export default Register