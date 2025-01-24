import React from "react";

const TournamentsMain = () => {
  return (
    <main className="flex flex-col gap-[20px] bg-white rounded-[15px] p-[30px] shrink-0 items-start shadow-shadowComp">
     <div className="flex flex-col gap-2 items-start">
        <h1 className="text-[32px] text-center font-bold leading-normal text-black">
          Battlefied of <span className="text-primaryColor">Champions</span>
        </h1>
        <p className="text-[16px] text-[#6A6A6A] font-semibold leading-3">
          Step onto the global stage where badminton&apos;s finest players compete
          for glory.
        </p>
     </div>
    </main>
  );
};

export default TournamentsMain;
