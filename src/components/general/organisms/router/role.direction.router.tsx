"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RoleDirectionRouter = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role === "admin") {
      router.push("/dashboard");
    } else if (session?.user?.role === "athlete") {
      router.push("/");
    }
  }, [session, router, status]);

  return null;
};
export default RoleDirectionRouter;
