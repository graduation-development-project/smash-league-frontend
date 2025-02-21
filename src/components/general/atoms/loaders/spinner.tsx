import React from "react";
import styles from "./spinner.module.scss";

const Spinner = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center absolute z-50 w-full h-full inset-0 bg-white">
      <div className={styles.loader}></div>
      <div className="text-[20px] font-semibold">
        Please wait for the page to load...
      </div>
    </div>
  );
};

export default Spinner;
