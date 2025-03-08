import { Tooltip } from 'antd';
import React from 'react';

const InfoBox = ({ title, info }: { title: string; info: string }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#F6F6F6] gap-1 py-2 w-[200px] h-[100px] cursor-pointer">
      <h2 className="text-[12px] border-b-2 border-solid border-primaryColor">
        {title}
      </h2>
      <p className="text-[16px] text-center font-bold w-full overflow-hidden whitespace-nowrap text-ellipsis">
        <Tooltip title={info}>{info}</Tooltip>
      </p>
    </div>
  );
};

export default InfoBox;
