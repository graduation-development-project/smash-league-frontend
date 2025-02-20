import { auth } from "@/auth";
import RoleDirectionRouter from "@/components/general/organisms/router/role.direction.router";
import React from "react";

const Direction = async () => {
  const session = await auth();

  if (!session) return null;
  return <RoleDirectionRouter session={session} />;
};

export default Direction;
