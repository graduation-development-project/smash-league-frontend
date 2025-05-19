import InfoBox from '@/components/general/atoms/profile/athlete/info.box';
import InfoLine from '@/components/general/atoms/profile/athlete/info.line';
import { calculateAge } from '@/utils/calculateAge';
import { formatDate, formatHeight } from '@/utils/format';
import { Divider } from 'antd';
import { IoIosArrowRoundBack } from 'react-icons/io';
import React from 'react';

const BasicInfo = ({ info }: { info: any }) => {
  console.log('info', info);

  return (
    <div className="w-full h-full flex flex-col gap-4 rounded-[10px] shadow-shadowBtn p-6">
      <h2 className="text-[32px] font-bold text-primaryColor underline  w-full h-full">
        BASIC INFO
      </h2>
      <div className="w-full h-full flex justify-between">
        <div className=" w-full h-full flex flex-col gap-3">
          <div className="w-full h-full flex gap-2">
            <InfoBox
              title="AGE"
              info={calculateAge(info?.dateOfBirth).toString() || 'No Info'}
            />
            <InfoBox
              title="HEIGHT(cm)"
              info={formatHeight(info?.height) || 'No Info'}
            />
            <InfoBox title="HAND" info={info?.hand || 'No Info'} />
          </div>
          <div className="w-full h-full flex gap-2 justify-center">
            <InfoBox title="LOCATION" info={info?.location || 'No Info'} />
            <InfoBox title="LANGUAGE" info={info?.language || 'No Info'} />
          </div>
          <div
            className="flex align-bottom items-center text-primaryColor text-[15px] hover:underline hover:font-semibold cursor-pointer"
            onClick={() => window.history.back()}
          >
            <IoIosArrowRoundBack size={22} className="" /> Previous Page
          </div>
        </div>
        <div className="w-full h-full flex flex-col px-9">
          <InfoLine
            quest="When did you start playing competitively?"
            ans={info?.startPlayingCompetitively || 'No Info'}
          />
          <Divider />
          <InfoLine
            quest="Date Of Birth"
            ans={
              formatDate(info?.dateOfBirth) === 'Invalid Date'
                ? 'No Info'
                : formatDate(info?.dateOfBirth)
            }
          />
          <Divider />
          <InfoLine
            quest="Place Of Birth"
            ans={info?.placeOfBirth || 'No Info'}
          />
          <Divider />
          <InfoLine
            quest="When did you start playing sport?"
            ans={info?.startPlayingSport || 'No Info'}
            // ans="In 2009, I have started playing badminton and my brother recommended playing badminton"
          />
          <Divider />
          <InfoLine
            quest="Sport Ambitions"
            ans={info?.sportAmbitions || 'No Info'}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
