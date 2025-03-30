'use client';
import { Button } from '@/components/ui/button';
import { useProfileContext } from '@/context/profile.context';
import { buyPackageAPI } from '@/services/package';
import { formatMoney } from '@/utils/format';
import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';

const PackageCard = ({ pack }: { pack: PackageCardProps }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  // console.log('check user', user);
  const handleBuyPackage = async (packageId: string) => {
    if (!user) return;
    try {
      const response = await buyPackageAPI(packageId, user.access_token);
      // console.log('Package ID', packageId);
      // console.log('Access Token', user.access_token);
      console.log(response, 'check payment');
      if (response.statusCode === 200 || response.statusCode === 201) {
        toast.success(`${response?.message}`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setTimeout(
          (window.location.href =
            response.data.checkoutDataResponse.checkoutUrl),
          2000,
        );
      } else {
        console.log('Error', response);
        toast.error(`${response?.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-col py-4 px-6 border border-gray-400 rounded-[10px] ${
        pack.isRecommended
          ? 'bg-[#2c2c2c] text-white shadow-shadowBtn border-secondColor'
          : ''
      }`}
    >
      <h1 className="font-bold text-[24px] w-full h-full flex flex-col">
        <span>{pack.packageName}</span>
        <div
          className={`w-14 h-[2px] rounded-[10px] ${
            pack.isRecommended ? 'bg-secondColor' : 'bg-primaryColor'
          } `}
        />
      </h1>
      <div className="w-full h-full flex flex-col gap-2 pt-5">
        <div className="w-full h-full flex justify-between items-center">
          <h2 className="font-semibold">
            <span className="font-bold text-3xl">
              {formatMoney(pack.price - pack.currentDiscountByAmount)}
            </span>
            /month
          </h2>
          <h4 className="line-through font-semibold text-gray-500">
            {formatMoney(pack.price)}
          </h4>
        </div>
        <p
          className={`text-[13px] italic w-[300px] trunc${
            pack.isRecommended ? 'text-white' : 'text-gray-500'
          }`}
        >
          {pack.packageDetail}
        </p>
      </div>
      <Divider />
      <ul
        className={`w-full h-full flex flex-col gap-4 justify-center text-sm font-semibold ${
          pack.isRecommended ? 'text-white' : 'text-slate-500'
        } px-4 pb-6`}
      >
        {pack.advantages.map((item, index) => (
          <li key={index} className="w-full h-full flex gap-2">
            <IoCheckmarkSharp size={15} className="text-secondColor" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Button
        size={'sm'}
        colorBtn={`${
          pack.isRecommended ? 'gradientGreenBtn' : 'gradientOrangeBtn'
        }`}
        // disabled={!pack.isAvailable}
        onClick={() => handleBuyPackage(pack.id)}
      >
        Choose {pack.packageName}
      </Button>
    </div>
  );
};

export default PackageCard;
