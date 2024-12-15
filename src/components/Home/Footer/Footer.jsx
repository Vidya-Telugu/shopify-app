import React from 'react'
import styles from "./Footer.module.css"
function Footer() {
    return (
        <div className={styles.outercontainer}>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <span className={styles.logotext}>Buymart</span>
                    <p className={styles.footerdetails}>we are passionate about delivering exceptional customer service and support
                       our goal is to provide the highest quality products at affordable prices.
                    </p>
                 </div>
                <div className={styles.col2}>
                  <p>COMPANY</p>
                  <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                  </ul>
                </div>
                <div className={styles.col3}>
                    <p>GET IN TOUCH</p>
                    <ul>
                      <li>+1-212-456-7898</li>
                      <li>contact@buymart.com</li>
                    </ul>
                </div>
            </div>
                <div>
                   <hr />
                   <p  className={styles.copyright}>Copyright 2024@ Buymart.com -All Rights Reserved</p>
                </div>
        </div>
    )
}

export default Footer
