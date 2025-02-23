import BasicInfo from "@/components/general/molecules/profile/athlete/basic.info";
import Gallery from "@/components/general/molecules/profile/athlete/gallery";
import PreviousMatches from "@/components/general/molecules/profile/athlete/previous.matches";
import React from "react";

const OverviewAthleteProfile = () => {
  return (
    <div className="w-full flex flex-col gap-20 py-10 px-14">
      <BasicInfo />
      <PreviousMatches />
      <Gallery />
    </div>
  );
};

export default OverviewAthleteProfile;
