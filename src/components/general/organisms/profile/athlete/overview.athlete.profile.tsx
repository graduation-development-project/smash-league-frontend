import BasicInfo from '@/components/general/molecules/profile/athlete/basic.info';
import Gallery from '@/components/general/molecules/profile/athlete/gallery';
import PreviousMatches from '@/components/general/molecules/profile/athlete/previous.matches';
import React from 'react';

const OverviewAthleteProfile = ({
  info,
  setProfile,
}: {
  info: any;
  setProfile: React.Dispatch<any>;
}) => {
  // console.log(info);

  return (
    <div className="w-full flex flex-col gap-20 py-10 px-14">
      <BasicInfo info={info} />
      <PreviousMatches info={info} />
      {/* <Gallery /> */}
    </div>
  );
};

export default OverviewAthleteProfile;
