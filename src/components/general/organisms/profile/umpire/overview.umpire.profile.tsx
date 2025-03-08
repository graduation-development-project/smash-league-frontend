import Gallery from '@/components/general/molecules/profile/athlete/gallery';
import PreviousMatches from '@/components/general/molecules/profile/athlete/previous.matches';
import UmpireBasicInfo from '@/components/general/molecules/profile/umpire/basic.info.umpire';
import React from 'react';

const OverviewUmpireProfile = () => {
  return (
    <div className="w-full flex flex-col gap-20 py-10 px-14">
      <UmpireBasicInfo />
      <PreviousMatches />
      <Gallery />
    </div>
  );
};

export default OverviewUmpireProfile;
