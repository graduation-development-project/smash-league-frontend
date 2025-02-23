import PreviousMatchBox from "@/components/general/atoms/profile/athlete/previous.match.box";
import React from "react";

const PreviousMatches = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center  gap-2 shadow-shadowBtn rounded-[10px] p-6">
      <h2 className="text-[32px] font-bold text-primaryColor underline border-primaryColor w-full h-full text-center">
        PREVIOUS MATCHES
      </h2>
      <div className="w-full h-full flex justify-between items-center gap-2">
        <PreviousMatchBox />
        <PreviousMatchBox />

      </div>
    </div>
  );
};

export default PreviousMatches;
