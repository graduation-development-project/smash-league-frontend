"use client";

import images from "@/assets/images";
import LoginForm from "@/components/general/organisms/auth/login.form";
import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-around w-full h-screen ">
      <div className="w-1/2 h-full bg-yellow-800 mix-blend-multiply">
        <Image
          src={images.orangeBackgroundImage}
          alt="Orange Background"
          // layout="fill" // Makes the image cover the parent div
          objectFit="cover" // Ensures the image maintains aspect ratio
          quality={100} // Increases image clarity
          priority // Loads the image faster
          className="w-full h-full object-fill mix-blend-multiply"
        />
      </div>
      <div className="w-1/2 h-full shadow-shadowComp">
        {" "}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
