import React, { useContext} from 'react'
import styles from "./Nav.module.css";
import { Link,useNavigate } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { Authcontext } from '../../../contexts/Authcontext';
import { FilterContext } from '../../../contexts/FilterContext';
function Nav() {
  const navigate=useNavigate();
  const{searchtext,setSearchtext}=useContext(FilterContext);
  const{logout,authenticated}=useContext(Authcontext);
  function handleSearch(e){
     navigate("/search");
     setSearchtext(e.target.value);
  }
  function handleLogout() {
    logout();
    alert("Logged out successfully");
  }
  return (
    <div className={styles.navcontainer}>
      <div className={styles.logo}>
        <span className={styles.logotext}>Buymart</span>
      </div>
      <div className={styles.searchdiv}>
      <input type="search" className={styles.searchinput} onChange={handleSearch} placeholder="Search product"></input>
      </div>
      <div className={styles.cartSearch}>
       <Link to="/home" className={styles.home}><IoHome size={30}/></Link>
       <Link to="/info"><p><FaRegCircleUser  size="30" color="black"/></p></Link>
        <Link to="/cart"><span className={styles.clicons}><FaCartArrowDown size={30} /></span></Link>
        {
          authenticated?<Link><button className={styles.logoutbtn} onClick={()=>handleLogout()}>Logout</button></Link>
          :<Link to="/login"><button className={styles.loginbtn}>login</button></Link>
        }
      </div>
    </div>
  )
}

export default Nav
