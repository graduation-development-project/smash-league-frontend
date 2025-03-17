'use client';

import { Button } from '@/components/ui/button';
import { formatMoney } from '@/utils/format';
import { Divider } from 'antd';
import React from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';

const PackageCard = ({
  title,
  newPrice,
  oldPrice,
  description,
  advantages,
  credit,
  recommended,
}: PackageCardProps) => {
  return (
    <div
      className={`w-full h-full flex flex-col py-4 px-6 border border-gray-400 rounded-[10px] ${
        recommended
          ? 'bg-[#2c2c2c] text-white shadow-shadowBtn border-secondColor'
          : ''
      }`}
    >
      <h1 className="font-bold text-[24px] w-max h-max flex flex-col">
        <span>{title}</span>
        <div
          className={`w-14 h-[2px] rounded-[10px] ${
            recommended ? 'bg-secondColor' : 'bg-primaryColor'
          } `}
        />
      </h1>
      <div className="w-full h-full flex flex-col gap-2 pt-5">
        <div className="w-full h-full flex justify-between items-center">
          <h2 className="font-semibold">
            <span className="font-bold text-3xl">{formatMoney(newPrice)}</span>
            /month
          </h2>
          <h4 className="line-through font-semibold text-gray-500">
            {formatMoney(oldPrice)}
          </h4>
        </div>
        <p
          className={`text-sm italic ${
            recommended ? 'text-white' : 'text-gray-500'
          }`}
        >
          {description}
        </p>
      </div>
      <Divider />
      <ul
        className={`w-full h-full flex flex-col gap-4 justify-center text-sm font-semibold ${
          recommended ? 'text-white' : 'text-slate-500'
        } px-4 pb-6`}
      >
        {advantages.map((item, index) => (
          <li key={index} className="w-full h-full flex gap-2">
            <IoCheckmarkSharp size={15} className="text-secondColor" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Button
        size={'sm'}
        colorBtn={`${recommended ? 'gradientGreenBtn' : 'gradientOrangeBtn'}`}
      >
        Choose {title}
      </Button>
    </div>
  );
};

export default PackageCard;
