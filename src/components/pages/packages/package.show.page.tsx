'use client';
import PackageCard from '@/components/general/atoms/packages/package.card';
import { getAllPackagesAPI } from '@/services/package';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const PackagePage = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const isHasOrganizerRole = user?.userRoles.includes('Organizer');

  const getAllPackages = async () => {
    setIsLoading(true);
    const response = await getAllPackagesAPI();
    // console.log('check', response);
    setPackages(response?.data);
    setIsLoading(false);
    if (response.statusCode === 200 || response.statusCode === 201) {
      setIsLoading(false);
    } else {
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
  };

  useEffect(() => {
    getAllPackages();
  }, []);

  const advantagesList = ['Hehe'];
  // console.log('Check Packages', packages);
  return (
    <div className="w-full h-full flex flex-col gap-6 rounded-[10px] shadow-shadowComp p-8">
      <div className="flex flex-col gap-2 w-max">
        <h1 className="font-semibold text-[30px]">
          <span className="text-secondColor">Organizations</span>{' '}
          <span className="font-bold">Packages</span>
        </h1>
        <div className="w-24 h-[2px] rounded-[10px] bg-secondColor flex-end" />
      </div>
      <div className="w-full h-full flex justify-between items-center gap-5 ">
        {packages.map((item: PackageCardProps) => {
          return (
            <div key={item.id}>
              <PackageCard pack={item} isHasOrganizerRole={isHasOrganizerRole} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackagePage;
