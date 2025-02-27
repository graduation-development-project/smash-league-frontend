import { auth } from "@/auth";
import MainLayout from "@/components/layout/mainlayout/layout";
import OrganizersZonePage from "@/components/pages/organizers-zone/organizer-zone.page";
import React from "react";

const OrganizersZone = async () => {
  const session = await auth();

  return (
    <MainLayout session={session}>
      <div>
        <OrganizersZonePage session={session} />
      </div>
    </MainLayout>
  );
};

export default OrganizersZone;
