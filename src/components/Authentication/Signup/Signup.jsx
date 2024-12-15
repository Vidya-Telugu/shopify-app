import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { toast} from 'react-toastify';
import styles from './Signup.module.css';
function Signup() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');


  async function handleSignup(e) {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      toast.error('Passwords do not match!'); 
      return;
    }
    try {
      const userCredentials=await createUserWithEmailAndPassword(auth,Email,Password);
      const user=userCredentials.user;
      const uid = user.uid; 
      localStorage.setItem("userUID", uid);
      localStorage.setItem("token",user.accessToken);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      toast.success('Account Created Successfully!');
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || 'Error creating account. Please try again!';
        toast.error(errorMessage); 
    }
  }

  return (
    <>

      <div className={styles.outerContainer}>
        <form onSubmit={handleSignup} className={styles.formContainer}>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={Email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            name="Password"
            value={Password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            id="ConfirmPassword"
            name="ConfirmPassword"
            value={ConfirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className={styles.btn}>
            Signup
          </button>
        </form>
        <div className={styles.switchdiv}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
}

export default Signup;
