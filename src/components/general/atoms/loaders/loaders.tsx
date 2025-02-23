import React from "react";
import styles from "./loaders.module.scss";
const Loaders = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {isLoading && (
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center bg-white absolute z-10">
          <div className={styles.loader}></div>
          <div>Please wait for minutes...</div>
        </div>
      )}
    </>
  );
};

export default Loaders;
