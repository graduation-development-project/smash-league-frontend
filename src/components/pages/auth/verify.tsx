"use client"

import VerifyForm from "@/components/general/organisms/auth/verify.form";
import React from "react";

const Verify = (props: any) => {
  const { email } = props;

  return <VerifyForm email={email} />;
};

export default Verify;
