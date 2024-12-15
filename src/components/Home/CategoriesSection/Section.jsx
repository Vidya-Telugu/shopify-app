import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styles from "./Section.module.css";
import { FilterContext } from '../../../contexts/FilterContext';
function Section() {
  const {fetchCategory}=useContext(FilterContext);
    function handleCategory(category){
        fetchCategory(category);
    }
    return (
        <div className={styles.outerdiv}>
        <div className={styles.maindiv}>
            <div className={styles.sectiondiv} onClick={()=>handleCategory("Fruits")}> 
            <Link to="/category/Fruits"><div className={styles.fruits}></div></Link>
             <p>Fruits</p>
            </div>
            <div className={styles.sectiondiv} >
            <Link to="/category/Stationery"><div className={styles.stationery}></div></Link>
             <p>Stationery</p>
            </div>
           <div className={styles.sectiondiv}>
           <Link to="/category/Vegetables"><div className={styles.vegetables} onClick={()=>handleCategory("Vegetables")}></div></Link>
              <p>Vegetables</p>
            </div>
            <div className={styles.sectiondiv}>
            <Link to="/category/Cosmetics"><div className={styles.cosmetics}></div></Link>
              <p>Cosmetics</p>
            </div>
           <div className={styles.sectiondiv}>
            <Link to="/category/Gadgets"><div className={styles.gadgets}></div></Link>
               <p>Gadgets</p>
            </div>
            <div className={styles.sectiondiv}>
            <Link to="/category/HomeDecor"><div className={styles.homedecor}></div></Link>
               <p>HomeDecor</p>
            </div>
            <div className={styles.sectiondiv}>
            <Link to="/category/DairyProducts"><div className={styles.dairy}></div></Link>
              <p>Dairy</p>
            </div>
            <div className={styles.sectiondiv}>
            <Link to="/category/BakeryItems"><div className={styles.bakeryitems}></div></Link>
              <p>BakeryItems</p>
            </div>
        </div>
        </div>
    )
}

export default Section
