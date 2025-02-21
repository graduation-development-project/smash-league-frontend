import React from "react";
import styles from "./loaders.module.scss";
const Loaders = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center bg-opacity-50">
      <div className={styles.loader}></div>
      <div>Please wait for minutes...</div>
    </div>
  );
};

export default Loaders;
