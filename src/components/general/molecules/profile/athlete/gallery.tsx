import { Image } from "antd";
import React from "react";

const Gallery = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 shadow-shadowBtn rounded-[10px] p-6">
      <h2 className="text-[32px] font-bold text-primaryColor underline border-primaryColor w-full text-center">
        PHOTO GALLERY
      </h2>
      <div className="w-full h-full grid grid-cols-3 gap-x-4 gap-y-2 content-center overflow-auto">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="w-max h-max flex justify-center">
            <Image
              width={450} 
              height={350} 
              src="https://thebridge.in/h-upload/uid/1WBjBeRGUTAFdtLSbygdVctMuxxkfATBS2658560.jpg"
              alt="gallery"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
