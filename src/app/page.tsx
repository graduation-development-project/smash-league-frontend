import { auth } from "@/auth";
import RoleDirectionRouter from "@/components/general/organisms/router/role.direction.router";
import React from "react";

const Direction = async () => {
  const session = await auth();

  return <RoleDirectionRouter session={session} />;
};

export default Direction;
