import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../Redux/ApiReducer';


function Register() {
  const [errorMessages, setErrorMessages] = useState({});
  const [newdata, setnewData] = useState({username : "", email : "", password: ""});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const soumettre = (event) => {
    event.preventDefault();
    dispatch(addUser(newdata)).then((res) => {
      let error = res.payload.error;
      if (error){
        setErrorMessages({name: "uname", message: "Username Already Existing"});
      } else {
        navigate("/")
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
            <input type='email' name="email" required placeholder='Adresse E-Mail' onChange={(e)=>setnewData({...newdata, email: e.target.value})} />
        </div>
        <div className="input-container">
            <input type="text" name="uname" required placeholder='Username' onChange={(e)=>setnewData({...newdata, username: e.target.value})}/>
            {erreur("uname")}
        </div>
        <div className="input-container">
            <input type="password" name="pass" required placeholder='Password' onChange={(e)=>setnewData({...newdata, password: e.target.value})}/>
        </div>
        <div>
            <p>Already Registrated ? <Link to="/"><span>Click Here to Login!</span></Link></p>
        </div>
        <div className="button-container">
            <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default Register