import React  from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../Redux/Reducer';

function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [dataUser, setdataUser] = useState({username : "", password : ""});
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const soumettre = (event) => {
    event.preventDefault();   
    dispatch(LoginUser(dataUser)).then((res) => {
      let loggedIn = res.payload.islogged;
      if (loggedIn) {
        navigate("/home")
      } else {
        setErrorMessages({name: "error", message: "Wrong Username or Password, please try again"});
      }
    })
  }

  const erreur = (name) => 
    name === errorMessages.name && (
      <div className='erreur'>{errorMessages.message}</div>
     );

  return (
    <div className="form">
      <form onSubmit={soumettre}>
        <div className="input-container">
            <input type="text" name="uname" required placeholder='Username' onChange={(e)=>setdataUser({...dataUser, username: e.target.value})}/>
        </div>
        <div className="input-container">
            <input type="password" name="pass" required placeholder='Password' onChange={(e)=>setdataUser({...dataUser, password: e.target.value})} />
            {erreur("error")}
        </div>
        <div>
            <p>Not registered yet ? <Link to="/register"><span>Click Here!</span></Link></p>
        </div>
        <div className="button-container">
            <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default Login
