import React, { useContext,useEffect,useRef} from 'react'
import { FilterContext } from '../../../contexts/FilterContext'
import styles from "./DisplayCategory.module.css"
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function Fruits() {
 const{categorized,fetchCategory,deleteProduct}=useContext(FilterContext);
 const{categoryName}=useParams();
 function handleDelete(product){
       deleteProduct(product);
 }
  useEffect(()=>{
   fetchCategory(categoryName);
  },[]);
  return (
    <div className={styles.outercontainer}>
    <div className={styles.container}>
      {
        categorized.map((product)=>{
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
  );
}

export default Fruits
