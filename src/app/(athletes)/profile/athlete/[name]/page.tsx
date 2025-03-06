import { auth } from "@/auth";
import Footer from "@/components/layout/mainlayout/footer";
import MainLayout from "@/components/layout/mainlayout/layout";
import Navigation from "@/components/layout/mainlayout/navigation";
import AthleteProfilePage from "@/components/pages/profile/athlete.profile.page";
import React from "react";

const AthleteProfile = async () => {
  const session = await auth();
  return (
    <>
      <MainLayout session={session} noHero={true}>
        <div className="mt-[70px] relative">
          <AthleteProfilePage session={session} />
        </div>
      </MainLayout>
    </>
  );
};

export default AthleteProfile;
