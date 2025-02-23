import InfoBox from "@/components/general/atoms/profile/athlete/info.box";
import InfoLine from "@/components/general/atoms/profile/athlete/info.line";
import { Divider } from "antd";
import React from "react";

const BasicInfo = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 rounded-[10px] shadow-shadowBtn p-6">
      <h2 className="text-[32px] font-bold text-primaryColor underline border-primaryColor w-full h-full">
        BASIC INFO
      </h2>
      <div className="w-full h-full flex justify-between">
        <div className=" w-full h-full flex flex-col gap-3">
          <div className="w-full h-full flex gap-2">
            <InfoBox title="AGE" info="24" />
            <InfoBox title="HEIGHT(cm)" info="175" />
            <InfoBox title="HAND" info="Right" />
          </div>
          <div className="w-full h-full flex gap-2 justify-center">
            <InfoBox title="LOCATION" info="Thu Duc, Ho Chi Minh" />
            <InfoBox title="LANGUAGE" info="Vietnamese" />
          </div>
        </div>
        <div className="w-full h-full flex flex-col px-9">
          <InfoLine
            quest="When did you start playing competitively?"
            ans="2020"
          />
          <Divider />
          <InfoLine quest="Date Of Birth" ans="12/12/2000" />
          <Divider />
          <InfoLine quest="Place Of Birth" ans="Thu Duc, Ho Chi Minh" />
          <Divider />
          <InfoLine
            quest="When did you start playing sport?"
            ans="In 2009, I have started playing badminton and my brother recommended playing badminton"
          />
          <Divider />
          <InfoLine
            quest="Sport Ambitions"
            ans="I want to be a professional badminton player"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
