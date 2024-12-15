import React, {  useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState,useContext} from 'react';
import styles from "./Product.module.css"
import { CartContext } from '../../../contexts/CartContext';
import { Authcontext } from '../../../contexts/Authcontext';
function Product() {
  const {productName}=useParams();
  const[products,setProducts]=useState([]);
  const[productData,setProductData]=useState();
  const{addToCart,cart}=useContext(CartContext);
  const {token}=useContext(Authcontext);
  function handleAddToCart(item){
   addToCart(item);
   console.log(cart);
  }
  async function fetchProducts(){
     const url="https://shop-sphere-react-default-rtdb.firebaseio.com/products.json";
     const response=await axios.get(url
    //   ,{
    //   headers:{
    //     'Content-Type': 'application/json', 
    //     'Authorization': 'Bearer YOUR_AUTH_TOKEN' 
    // }
    // }
  );
     const data=Object.values(response.data);
     console.log(token);
     setProducts(data);
  }
  useEffect(()=>{
    const product=products.find((item)=>item.pname==productName);
    setProductData(product);
   // console.log(productData);
  },[products ,productName])
  useEffect(()=>{
    fetchProducts();
  },[]);

  console.log(productName);
  return productData?(
    <div className={styles.outercontainer}>
     <div className={styles.productcontainer}>
        <div className={styles.image}>
           <img src={productData.pimage} alt="" height="300px" width="300px"/>
        </div>
        <div className={styles.maindiv}>
        <div className={styles.detailsDiv}>
          <div className={styles.pname}>
             <p>{productData.pname}</p>
          </div>
          <div className={styles.pprice}>
            <p>Rs.{productData.pprice}</p>
          </div>
          <div className={styles.pdesc}>
            <p>{productData.pdesc}</p>
          </div>
          <div className={styles.cartbtndiv}>
             <button className={styles.addbtn} onClick={()=>handleAddToCart(productData)}>ADD TO CART</button>
          </div>
          <div className={styles.cod}>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
        </div>
     </div>
    </div>
    )
    :
   <div style={{opacity:"0px"}}></div>
}

export default Product
