import React from 'react';
import { UmpireDegreeList } from '@/components/general/molecules/profile/umpire/umpire-degree-list';

const DegreesList = () => {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Umpire Qualifications
        </h1>
        <p className="text-muted-foreground">
          Manage your badminton umpire degrees and certificates
        </p>
      </div>

      <div className="mt-6">
        <UmpireDegreeList />
      </div>
    </div>
  );
};

export default DegreesList;
