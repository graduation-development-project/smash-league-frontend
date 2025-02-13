"use client";

import images from "@/assets/images";
import RegisterForm from "@/components/general/organisms/auth/register.form";
import Image from "next/image";
import React from "react";

const Register = () => {
  return (
    <div className="flex justify-around w-full h-screen ">
      <div className="w-[45%] h-full ">
        <Image
          src={images.greenBackgroundImage}
          alt="Greeb Background"
          // layout="fill" // Makes the image cover the parent div
          objectFit="cover" // Ensures the image maintains aspect ratio
          quality={100} // Increases image clarity
          priority // Loads the image faster
          className="w-full h-full object-fill "
        />
      </div>
      <div className="w-[55%] h-full shadow-shadowComp ">
        {" "}
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
