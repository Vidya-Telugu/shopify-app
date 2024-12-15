import React, { useContext } from 'react'
import styles from "./Login.module.css";
import { useState } from 'react';
import {toast} from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth,signInWithEmailAndPassword} from 'firebase/auth';
import { Authcontext } from '../../../contexts/Authcontext';
function Login() {
  const navigate=useNavigate();
    const[Email,setEmail]=useState("");
    const[Password,setPassword]=useState("");
    const {login}=useContext(Authcontext);
    async function handleLogin(e){
        e.preventDefault();
        const auth=getAuth();
        if(!Email && !Password){
          toast.error("Please enter email and password");
        }
        try{
           const userCredential=await signInWithEmailAndPassword(auth,Email,Password);
           const token=await userCredential.user.getIdToken(true);
           const user = userCredential.user;
           const uid = user.uid; 
           localStorage.setItem("uid",uid);
           console.log("uid",uid)
           console.log(token);
           login(token);
           localStorage.setItem("token",token);
           navigate("/home");
           setEmail("");
           setPassword("");
           toast.success("Logged in Successfully");
           }
        catch(error){
            toast.error(error.message);
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
       <Link to="/forgotpassword">Forgot Password?</Link>
       <button type="login" className={styles.btn}>Login</button>
      </form>
      <div className={styles.switchdiv}>
        Don't have an account?<Link to="/signup">Signup</Link>
      </div>
      </div>
    </>
  )
}

export default Login
