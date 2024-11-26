import React from 'react'
import styles from "./Banner.module.css";
function Banner() {
  return (
    <div className={styles.banner}>
        <div className={styles.slide}>
            <div className={styles.sidedetails}>
                   <h1>Top Quality Fashion Deals</h1>
                   <p>Steal deals on all categories</p>
                   <button className={styles.explorebtn}>Explore More</button>
            </div>
        </div>
    </div>
  )
}

export default Banner
