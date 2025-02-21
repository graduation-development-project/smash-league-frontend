import { auth } from "@/auth";
import PageDirection from "@/components/general/organisms/router/page.direction";
import MainLayout from "@/components/layout/mainlayout/layout";
import { useState, useEffect } from "react";

export default async function Home() {
  const session = await auth();

  return (
    <MainLayout session={session}>
      <PageDirection/>
    </MainLayout>
  );
}
