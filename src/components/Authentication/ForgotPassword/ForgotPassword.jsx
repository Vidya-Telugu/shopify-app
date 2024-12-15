import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import React from 'react'
import { getAuth } from 'firebase/auth';
import styles from "./ForgotPassword.module.css"
import { toast } from 'react-toastify';
function ForgotPassword(e) {
    const [Email,setEmail]=useState("");
    async function handleForgotPassword(e){
        e.preventDefault();
        const auth=getAuth();
        try{
          await sendPasswordResetEmail(auth,Email);
          toast.success("Password reset email sent successfully");
        }catch(error){
           toast.error(error.message);
        }
    }
  return (
    <div className={styles.outerContainer}>
      <form onSubmit={handleForgotPassword} className={styles.formContainer}>
      <label htmlFor="Email">Email</label>
      <input id="Email" name="Email" value={Email} placeholder="enter registered email" onChange={(e)=>setEmail(e.target.value)}></input>
      <button type="submit" className={styles.btn}>Send Reset Link</button>
      </form>
    </div>
  )
}

export default ForgotPassword
