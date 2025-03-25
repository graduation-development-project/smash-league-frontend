"use client";

import images from "@/assets/images";
import RegisterForm from "@/components/general/organisms/auth/register.form";
import Image from "next/image";
import React from "react";

const Register = () => {
  return (
    <div className="flex justify-around w-full h-screen">
      <div className="w-[45%] h-screen relative">
        <Image
          src={images.greenBackgroundImage}
          alt="Green Background"
          quality={100}
          priority
          className="object-cover"
        />
      </div>
      <div className="w-[55%] h-full">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;