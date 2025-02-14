import MainLayout from "@/components/layout/mainlayout/layout";
import React from "react";

const TeamLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <MainLayout>
      <div className="flex flex-col w-full justify-center items-center mt-24">{children}</div>
    </MainLayout>
  );
};

export default TeamLayout;
