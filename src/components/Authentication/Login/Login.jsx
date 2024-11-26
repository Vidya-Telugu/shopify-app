import React from 'react'
import styles from "./Login.module.css";
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../../../features/authSlice"
function Login() {
    const[Email,setEmail]=useState("");
    const[Password,setPassword]=useState("");
    const dispatch=useDispatch();
    async function handleLogin(e){
        e.preventDefault();
        const url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWFDSXAxyezi2ktimyTD7FSQI4hAXfJik";
         try{
           const response=await axios.post(url,{
                email:Email,
                password:Password,
                returnSecureToken:true,
           });
          const token=response.data.idToken;
          dispatch(login(token));
          setEmail("");
          setPassword("");
          alert("User Logged in Successfully");
         }catch(error){
            alert(error);
         }
    }
  return (
     <>
    <div className={styles.outerContainer}>
      <form onSubmit={handleLogin} className={styles.formContainer}>
        <label htmlFor='Email'>Email</label>
        <input type="email" id="Email" name="Email" value={Email}
        placeholder="enter email" onChange={(e)=>setEmail(e.target.value)}></input>
        <label htmlFor='Password'>Password</label>
        <input type="password" id="Password" name="Password" value={Password} 
        placeholder="enter password" onChange={(e)=>setPassword(e.target.value)}></input>
        <p>Forgot Password?</p>
        <button type="submit" className={styles.btn}>Login</button>
      </form>
      <div className={styles.switchdiv}>
        Don't have an account?<Link to="/signup">Signup</Link>
      </div>
      </div>
    </>
  )
}

export default Login
