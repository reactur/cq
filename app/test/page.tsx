"use client";

import React from "react";
import Image from "next/image";
import styles from "./Test.module.css";

const Test = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <span className={styles.left}>N.G</span>
        <span className={styles.center}>
          Independent web developer & designer
        </span>
        <span className={styles.right}>About</span>
      </header>

      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.hovig}>HOVIG</h1>
        <div className={styles.imageWrapper}>
          <div className={styles.circleDecor}></div>
          <Image
            src="/images/mbappe.png" // replace with your image path
            alt="Profile"
            fill
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        </div>
        <h1 className={styles.hagopian}>HAGOPIAN</h1>
      </div>
    </div>
  );
};

export default Test;
