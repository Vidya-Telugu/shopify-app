import React, { useContext, useState } from 'react'
import styles from "./Order.module.css";
import { CartContext } from '../../../contexts/CartContext';


function Orders(){
  const[track,setTrack]=useState(false);
  const {orders} = useContext(CartContext);
  console.log(orders);
  
  if (!Array.isArray(orders) || orders.length === 0){
    return <div>Loading orders or no orders found...</div>;
  }
  if(orders.length === 0){
    return <div>No orders found</div>;
  }
  
  return (
    <div className={styles.outmost}>
    <div className={styles.outercontainer}>
      <h2>Your Orders</h2>
      {orders.map((order, index) => (
        <div key={index} className="order">
          <ul className={styles.orderscontainer}>
            {order.items.map((item, itemIndex) => (
              <li key={itemIndex} className={styles.product}>
                <div className={styles.imagediv}>
                <img src={item.pimage} width="100px" height="100px"></img>
                <div>
                  <p>{item.pname}</p>
                  <p>Quantity:{item.quantity}</p>
                  <p className={styles.date} id="date">Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                </div>
                <div>
                  <button className={styles.trackbtn} onClick={()=>setTrack(!track)}>Track order</button>
                  {
                    track?<p>{order.status}</p>:""
                  }
                </div>
                <div>
                <p>Rs.{item.pprice}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Orders;

