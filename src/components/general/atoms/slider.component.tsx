import { sliderImages } from "@/assets/data";
import { useHomeContext } from "@/context/home.context";
import Image from "next/image";
import React, { useState } from "react";

const SliderComponent = () => {
  const { activeSlide } = useHomeContext();

  // const [currentSlide, setCurrentSlide] = useState(1);

  const list = [1, 2, 3, 4, 5];
  const [curIndex, setCurIndex] = useState(1);

  const listDots = () => {
    return sliderImages.map((item, index) => (
      <div
        onClick={() => setCurIndex(item.id)}
        key={item.id}
        className={
          curIndex === item.id
            ? `w-3 h-3 bg-secondColor rounded-full hover:scale-110`
            : `w-2 h-2 bg-gray-300 rounded-full hover:scale-110`
        }
      />
    ));
  };

  if (!sliderImages || sliderImages.length === 0) {
    console.error("sliderImages is not defined or empty.");
    return <div>No images available</div>;
  }
  return (
    <div className="relative w-full h-full flex flex-col gap-3 bg-transparent items-center">
      <div className="relative w-full h-full">
        {/* <img
                    className="rounded shadow-lg w-full h-full object-cover"
                    src="https://static.wixstatic.com/media/eba151_d509cfa8e3a848a7b5b234089020d4a2~mv2.jpg/v1/fill/w_640,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/eba151_d509cfa8e3a848a7b5b234089020d4a2~mv2.jpg"
                    alt=""
                /> */}

        {sliderImages.map((item) => (
          <div
            key={item.id}
            className={`${
              curIndex === item.id ? "block" : "hidden"
            } w-full h-full rounded-[0.5rem]`}
          >
            <Image
              src={item.url}
              alt={`Featured Tournament ${item.id}`}
              quality={100}
              priority
              className="rounded-xl shadow-lg w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute z-10 bottom-0 w-fit h-8 flex flex-row gap-3 px-3 py-1 rounded-full items-center">
        {listDots()}
      </div>
    </div>
  );
};

export default SliderComponent;
