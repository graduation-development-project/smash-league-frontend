import InfoBox from "@/components/general/atoms/profile/athlete/info.box";
import InfoLine from "@/components/general/atoms/profile/athlete/info.line";
import { calculateAge } from "@/utils/calculateAge";
import { formatDate, formatHeight } from "@/utils/format";
import { Divider } from "antd";
import { calc } from "antd/es/theme/internal";
import { format } from "path";
import React from "react";

const BasicInfo = ({ info }: { info: any }) => {
  console.log(info);

  return (
    <div className="w-full h-full flex flex-col gap-4 rounded-[10px] shadow-shadowBtn p-6">
      <h2 className="text-[32px] font-bold text-primaryColor underline  w-full h-full">
        BASIC INFO
      </h2>
      <div className="w-full h-full flex justify-between">
        <div className=" w-full h-full flex flex-col gap-3">
          <div className="w-full h-full flex gap-2">
            <InfoBox title="AGE" info={calculateAge(info?.dateOfBirth).toString() || "N/A"} />
            <InfoBox title="HEIGHT(cm)" info={formatHeight(info?.height) || "N/A"} />
            <InfoBox title="HAND" info={info?.hand || "N/A"} />
          </div>
          <div className="w-full h-full flex gap-2 justify-center">
            <InfoBox title="LOCATION" info={info?.location || "N/A"} />
            <InfoBox title="LANGUAGE" info={info?.language || "N/A"} />
          </div>
        </div>
        <div className="w-full h-full flex flex-col px-9">
          <InfoLine
            quest="When did you start playing competitively?"
            ans={info?.startPlayingCompetitively || "N/A"}
          />
          <Divider />
          <InfoLine quest="Date Of Birth" ans={formatDate(info?.dateOfBirth) === "Invalid Date" ? "N/A" : formatDate(info?.dateOfBirth)} />
          <Divider />
          <InfoLine quest="Place Of Birth"
            ans={info?.placeOfBirth || "N/A"}
          />
          <Divider />
          <InfoLine
            quest="When did you start playing sport?"
            ans={info?.startPlayingSport || "N/A"}
          // ans="In 2009, I have started playing badminton and my brother recommended playing badminton"
          />
          <Divider />
          <InfoLine
            quest="Sport Ambitions"
            ans={info?.sportAmbitions || "N/A"}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
