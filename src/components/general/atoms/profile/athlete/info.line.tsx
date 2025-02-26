import React from "react";

const InfoLine = ({quest, ans}: {quest: string; ans: string}) => {
  return (
    <div className="w-full h-max flex justify-between items-center">
      <div className="text-[#6A6A6A] font-semibold w-[35%] break-words">{quest}</div>
      <div className="font-bold text-[16px] w-[45%] break-words ">{ans}</div>
    </div>
  );
};

export default InfoLine;
