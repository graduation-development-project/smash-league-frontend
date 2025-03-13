import { auth } from "@/auth";
import MainLayout from "@/components/layout/mainlayout/layout";
import React from "react";

const TournamentsLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <MainLayout session={session}>
      <div className="flex flex-col w-full justify-center items-center">
        {children}
      </div>
    </MainLayout>
  );
};

export default TournamentsLayout;

//Cai layout cua tournament ne
