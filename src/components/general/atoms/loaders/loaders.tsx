import React from "react";
import styles from "./loaders.module.scss";
const Loaders = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black bg-transparent">
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loaders;
