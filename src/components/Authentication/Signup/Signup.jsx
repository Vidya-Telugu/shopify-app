import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from "./Signup.module.css";
import axios from 'axios';
function Signup() {
    const[Email,setEmail]=useState("");
    const[Password,setPassword]=useState("");
    const[ConfirmPassword,setConfirmPassword]=useState("");
    async function handleSignup(e){
        e.preventDefault();
        if(Password!==ConfirmPassword){
          alert("Password and ConfirmPassword are not Matching");
          return;
        }
        const url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWFDSXAxyezi2ktimyTD7FSQI4hAXfJik";
        
         try{
           const response=await axios.post(url,{
                email:Email,
                password:Password,
                returnSecureToken:true,
           });
           console.log(response);
           const token=response.data.idToken;
           localStorage.setItem("token",token);
           console.log(token);
           setEmail("");
           setPassword("");
           setConfirmPassword("");
           alert("Account Created Successfully");

         }catch(error){
          console.error(error.response ? error.response.data : error.message);
            alert("Error in creating Account.Try Again!");
         }
    }
  return (
     <>
    <div className={styles.outerContainer}>
      <form onSubmit={handleSignup} className={styles.formContainer}>
        <label htmlFor='Email'>Email</label>
        <input type="email" id="Email" name="Email" value={Email}
        placeholder="enter email" onChange={(e)=>setEmail(e.target.value)}></input>
        <label htmlFor='Password'>Passsword</label>
        <input type="password" id="Password" name="Password" value={Password}
        placeholder="enter password" onChange={(e)=>setPassword(e.target.value)}></input>
        <label>Confirm Pasword</label>
        <input type="password" id="ConfirmPassword" name="ConfirmPassword" value={ConfirmPassword}
        placeholder='enter password'onChange={(e)=>setConfirmPassword(e.target.value)}></input>
        <button type="submit" className={styles.btn}>Signup</button>
      </form>
      <div className={styles.switchdiv}>
        Already have an account?<Link to="/login">Login</Link>
      </div>
      </div>
    </>
  )
}

export default Signup
