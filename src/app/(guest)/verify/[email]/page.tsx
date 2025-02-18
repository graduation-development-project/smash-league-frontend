import Verify from "@/components/pages/auth/verify";
import React from "react";
import { useLocation } from "react-router-dom";

const VerifyPage = ({ params }: { params: { email: string } }) => {
  const { email } = params;

  return (
    <>
      <Verify email={decodeURIComponent(email)} />
    </>
  );
};

export default VerifyPage;
