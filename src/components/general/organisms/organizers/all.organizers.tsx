'use client';

import React, { useEffect, useState } from 'react';
import OrganizersZoneInfoCard from '../../atoms/organizers/organizers.zone.info.card';
import SearchOrganizersZoneBar from '../../atoms/organizers/search.organizers.zone.bar';
import PaginationCard from '../../atoms/pagination/pagination-card';
import { getUserByRoleAPI } from '@/services/user';

const AllOrganizers = () => {
  const [organizersList, setOrganizersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleChannge = () => {};

  const getOrganizerList = async () => {
    try {
      setIsLoading(true);
      const response = await getUserByRoleAPI('Organizer');
      console.log('getOrganizerList', response);
      setOrganizersList(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganizerList();
  }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 px-20 py-4">
      <div className="w-full h-full">
        {' '}
        {/* <SearchOrganizersZoneBar /> */}
      </div>
      <div className="w-full grid grid-cols-4 gap-y-6 place-items-center justify-items-center px-5 py-8 bg-white shadow-shadowBtn rounded-[15px]">
        {organizersList.map((organizer:any) => (
          <div key={organizer?.id} className="w-max h-max">
            <OrganizersZoneInfoCard organizer={organizer}/>
          </div>
        ))}
      </div>
      {/* <div className="flex justify-center items-center w-max h-max bg-white shadow-shadowBtn rounded-[10px]">
        <PaginationCard
          total={12}
          currentPage={1}
          totalPerPage={6}
          onChange={handleChannge}
        />
      </div> */}
    </div>
  );
};

export default AllOrganizers;
