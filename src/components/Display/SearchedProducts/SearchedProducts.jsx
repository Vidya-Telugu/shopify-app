import React, { useContext, useEffect,useState} from 'react'
import { FilterContext } from '../../../contexts/FilterContext'
import styles from "./SearchedProducts.module.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
function SearchedProducts() {
  const{searchtext}=useContext(FilterContext);
  const[dummy,setdummy]=useState([]);
  const[products,setProducts]=useState([]);
  const search=searchtext.toLowerCase();
  async function fetchProducts(){
    const url = "https://shop-sphere-react-default-rtdb.firebaseio.com/products.json";
    try{
      const response=await axios.get(url);
      const data=Object.values(response.data);
      setProducts(data);
      console.log(products)
      const retrieved=products.filter((item)=>
        item.pname.toLowerCase().includes(search) || item.pcategory.toLowerCase().includes(search));
      setdummy(retrieved);
       console.log(retrieved);
    }catch(error){
        toast.error(error);
    }
  }
  useEffect(()=>{
    fetchProducts();
  },[products]);
  return (
    <div className={styles.outercontainer}>
    <div className={styles.container}>
      {
       dummy.map((product)=>{
          return <><div className={styles.productdiv} key={product.id || product.pname}>
            <Link to={`/product/${product.pname}`}>
            <div className={styles.imgdiv}>
            <img src={product.pimage} width="200px" height="200px" alt="No image"></img>
            </div>
            </Link>
            <div className={styles.details}>
              <div>{product.pname}</div>
              <div>Rs.{product.pprice}</div>
              <button className={styles.removebtn} onClick={()=>handleDelete(product)}>Remove Item</button>
              </div>
          </div>
          </>
        })
      }
    </div>
    </div>
  )
}

export default SearchedProducts
