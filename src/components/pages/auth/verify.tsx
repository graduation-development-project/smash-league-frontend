"use client"

import VerifyForm from "@/components/general/organisms/auth/verify.form";
import React from "react";

const Verify = (props: any) => {
  const { id } = props;

  return <VerifyForm id={id} />;
};

export default Verify;
