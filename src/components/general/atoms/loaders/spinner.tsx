import React from "react";
import styles from "./spinner.module.scss";

const Spinner = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {isLoading && (
        <div className="flex flex-col gap-4 justify-center items-center relative z-50 w-full h-full inset-0 bg-white mt-10">
          <div className={styles.loader}></div>
          <div className="text-[20px] font-semibold">
            Please wait for the page to load...
          </div>
        </div>
      )}
    </>
  );
};

export default Spinner;
