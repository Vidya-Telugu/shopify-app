import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from "./PersonalInfo.module.css";
function PersonalInfo() {
  const[storedAddresses,setStoredAddresses]=useState([]);
  const url="https://shop-sphere-react-default-rtdb.firebaseio.com/personalinfo.json"
  const[address,setAddress]=useState({street:"",city:"",state:"",zipcode:"",country:""});
  const [info,setInfo]=useState({Fname:"",Lname:"",Email:"",Phone:"",Address:{}});
  function handleInfo(e){
     setInfo((prev)=>({...prev,Address:{...address},[e.target.name]:e.target.value}));
  }
  function handleAddress(e){
     setAddress((prev)=>({...prev,[e.target.name]:e.target.value}));
     setInfo((prev)=>({...prev,Address:{...address,[e.target.name]:e.target.value}}));
  }
  async function handleSubmit(e){
     e.preventDefault();
     try{ddr
       await axios.post(url,info);
       console.log(info);
       setAddress(()=>({street:"",city:"",state:"",zipcode:"",country:""}));
       setInfo(()=>({Fname:"",Lname:"",Email:"",Phone:"",Address:""}));
     }
     catch(error){
       alert(error);
     }
  }
  function addAddress(){
      setStoredAddresses((prev)=>([...prev,{...address}]))
  }
  return (
    <div className={styles.maincontainer}>
    <div className={styles.outerContainer}>
      <form onSubmit={handleSubmit} className={styles.infoForm}>
        <h3>Personal Information</h3>
        <div className={styles.basicinfodiv}>
        <input type="text" value={info.Fname} name="Fname" placeholder="First Name" onChange={handleInfo}></input><br></br><br></br>
        <input type="text" value={info.Lname} name="Lname" placeholder="Last Name" onChange={handleInfo}></input><br></br><br></br>
        <input type="text" value={info.Phone} name="Phone" placeholder='Phonenumber' onChange={handleInfo}></input><br></br><br></br>
        <input type="email" value={info.Email} name="Email" placeholder="Email Address" onChange={handleInfo}></input><br></br><br></br>
        </div>
        <input type="text" value={address.street} name="street" placeholder="Street" onChange={handleAddress}></input><br></br><br></br>
        <input type="text" value={address.city} name="city" placeholder='City' onChange={handleAddress}></input><br></br><br></br>
        <input type="text" value={address.zipcode} name="zipcode" placeholder='ZipCode' onChange={handleAddress}></input><br></br><br></br>
        <input type="text" value={address.country} name="country" placeholder='Country' onChange={handleAddress}></input><br></br><br></br>
        <button type="submit" className={styles.submitbtn}>submit</button>
        <button className={styles.editbtn}>Edit Personal Info</button>
      </form>
    </div>
    <div className={styles.addressContainer}>
      <form className={styles.addressform}>
      <h3>Add New Address</h3>
      <input type="text" value={address.street} name="street" placeholder="Street" onChange={addAddress}></input><br></br><br></br>
        <input type="text" value={address.city} name="city" placeholder='City' onChange={addAddress}></input><br></br><br></br>
        <input type="text" value={address.zipcode} name="zipcode" placeholder='ZipCode' onChange={addAddress}></input><br></br><br></br>
        <input type="text" value={address.country} name="country" placeholder='Country' onChange={addAddress}></input><br></br><br></br>
         <button type="submit" className={styles.submitbtn}>submit</button>
      </form>
    </div>
    <div className={styles.orderspage}>
      <Link to="/orderspage"><button>Show orders</button></Link>
    </div>
    </div>
  )
}

export default PersonalInfo

