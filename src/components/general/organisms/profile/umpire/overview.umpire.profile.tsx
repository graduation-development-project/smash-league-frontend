import Gallery from '@/components/general/molecules/profile/athlete/gallery';
import PreviousMatches from '@/components/general/molecules/profile/athlete/previous.matches';
import UmpireBasicInfo from '@/components/general/molecules/profile/umpire/basic.info.umpire';
import React from 'react';

const OverviewUmpireProfile = ({
  profile,
  setProfile,
}: {
  profile: any;
  setProfile: React.Dispatch<any>;
}) => {
  return (
    <div className="w-full flex flex-col gap-20 py-10 px-14">
      <UmpireBasicInfo profile={profile} setProfile={setProfile}/>
      <PreviousMatches />
      <Gallery />
    </div>
  );
};

export default OverviewUmpireProfile;
