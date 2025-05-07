/* eslint-disable @next/next/no-img-element */
import images from '@/assets/images';
import { formatDate } from '@/utils/format';

import React from 'react';

const OrganizerCard = ({ tour }: { tour: any }) => {
  console.log('Check tour', tour);
  return (
    <div className="w-full h-full flex justify-between gap-5">
      <div className="relative w-full flex items-center rounded-[15px]">
        <div className="absolute w-full h-full z-0 shadow-shadowComp rounded-[15px]">
          <img
            src={tour?.backgroundTournament ? tour.backgroundTournament : ''}
            alt={`Tournament ${tour.id}`}
            className="rounded shadow-lg w-full h-full object-cover animate-fadeInRight"
          />
        </div>

        <div className="relative z-10 flex flex-col p-10 gap-3 text-[18px] text-white font-bold leading-normal mt-4">
          <h1 className="w-[70%]">{tour?.name}</h1>
        </div>

        <div className="text-white text-right text-[16px] font-semibold absolute z-10 top-0 left-0 bg-secondColor px-[15px] py-[5px] rounded-tr-[3px] rounded-tl-[5px] rounded-br-[10px]">
          {tour?.isRecruit ? 'Recruitment' : 'Not Recruitment'}
        </div>

        <div className="text-white text-right text-[16px] font-semibold absolute z-10 top-0 right-0 bg-secondColor px-[15px] py-[5px] rounded-tr-[3px] rounded-bl-[10px]">
          {formatDate(tour?.startDate)}
        </div>
      </div>
    </div>
  );
};

export default OrganizerCard;
