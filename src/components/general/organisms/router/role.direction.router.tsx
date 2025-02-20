"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RoleDirectionRouter = (props: any) => {
  const { session } = props;
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role === "admin") {
      router.push("/dashboard");
    } else if (session?.user?.role === "Athlete") {
      router.push("/");
    }
  }, [session, router]);

  return null;
};
export default RoleDirectionRouter;
