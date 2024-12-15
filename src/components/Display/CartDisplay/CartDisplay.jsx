import React, { useContext, useEffect } from 'react'
import styles from "./CartDisplay.module.css";
import axios from "axios";
import { CartContext } from '../../../contexts/CartContext';
import { Link } from 'react-router-dom';
function CartDisplay() {
    //const[billamount,setBillamount]=useState(0);
    const{cart,billamount,handleDecQuantity,handleDeletefromCart,handleIncQuantity,handleOrders}=useContext(CartContext);
    console.log("Cart in CartDisplay:", cart);
    return (

      <div className={styles.outercontainer}>
      <div className={styles.headingdiv}>
      <h2>My ShoppingCart</h2>
     </div>
    <div className={styles.container}>
      <div>
      </div>
      {
        cart.map((item,index)=>{ 
           return <div className={styles.productcontainer} key={index}>
             <div className={styles.productdiv}>
               <div className={styles.imageanddetails}>
                <div className={styles.imgdiv}><img src={item.pimage} width="100px" height="100px"></img></div>
                <div className={styles.detailsdiv}>
                <p className={styles.name}>{item.pname}</p>
                <p className={styles.price}>{item.pprice}</p>
                </div>
                </div>
                <span className={styles.quantbox}>
                  <button className={styles.decbtn} onClick={()=>handleIncQuantity(item.pname)}>+</button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button className={styles.incbtn} onClick={()=>handleDecQuantity(item.pname)}>-</button>
                </span>
                <div className={styles.tprice}>
                  Rs.{item.pprice*item.quantity}
                </div>
                <span onClick={()=>handleDeletefromCart(item)}>x</span>
             </div>
             <hr></hr>
           </div>
        })
      }
    </div>
    <div className={styles.outer}>
    {cart.length!==0?<div className={styles.totalsDiv}>
       <h2>PRICE DETAILS---</h2>
       <div className={styles.billDetails}>
       <div className={styles.subtotaldiv}>
        <p>subtotal</p>
        <p>Rs.{billamount}</p>
       </div>
       <hr></hr>
       <div className={styles.shoppingdiv}>
         <p>Shopping Fee</p>
         <p>Rs.10</p>
       </div>
       <hr></hr>
       <div className={styles.totalAmount}>
        <p>Total Amount</p>
        <p>Rs.{billamount+10}</p>
       </div>
       <div>
         <button className={styles.orderBtn} onClick={()=>handleOrders()}>PLACE ORDER</button>
       </div>
       </div>
    </div>:""
    } 
    </div>
    </div>
  )
}

export default CartDisplay
