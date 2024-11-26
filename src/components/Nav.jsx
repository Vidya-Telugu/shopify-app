import React from 'react'
import styles from "./Nav.module.css";
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux';
//import { logout } from '../features/authSlice';
function Nav() {
  const { isAuthenticated } = useSelector(state => state.Authentication);
  const dispatch = useDispatch();
  // function handleLogout() {
  //   localStorage.removeItem("token");
  //   dispatch(logout());
  //   alert("Logged out successfully");
  // }
  return (
    <div className={styles.navcontainer}>
      <div className={styles.logo}>
        <span className={styles.logotext}>Shopify</span>
      </div>
      <div className={styles.cartSearch}>
        <button className={styles.adminbtn}>Admin</button>
        <span className={styles.clicons}><FaSearch size={30} /></span>
        <span className={styles.clicons}><FaCartArrowDown size={30} /></span>
      </div>
    </div>
  )
}

export default Nav
