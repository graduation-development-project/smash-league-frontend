import PackageCard from '@/components/general/atoms/packages/package.card';
import React from 'react';

const PackagePage = () => {
  const advantagesList = [
    'Have the 3 times for tournament organization',
    'Have the 3 times for tournament organization',
    'Have the 3 times for tournament organization',
    'Have the 3 times for tournament organization',
    'Have the 3 times for tournament organization',
  ];
  return (
    <div className="w-full h-full flex flex-col gap-6 rounded-[10px] shadow-shadowComp p-8">
      <div className="flex flex-col gap-2 w-max">
        <h1 className="font-semibold text-[30px]">
          <span className="text-secondColor">Organizations</span> Packages
        </h1>
        <div className="w-24 h-[2px] rounded-[10px] bg-secondColor flex-end" />
      </div>
      <div className="w-full h-full flex justify-between items-center gap-5 ">
        <PackageCard
          title="Starter"
          newPrice={75000}
          oldPrice={100000}
          description="For the small the organizations"
          advantages={advantagesList}
          credit={3}
        />
        <PackageCard
          title="Pro"
          newPrice={120000}
          oldPrice={150000}
          description="For the medium the organizations"
          advantages={advantagesList}
          credit={5}
          recommended={true}
        />
        <PackageCard
          title="Advanced"
          newPrice={175000}
          oldPrice={200000}
          description="For the big the organizations"
          advantages={advantagesList}
          credit={10}
        />
      </div>
    </div>
  );
};

export default PackagePage;
