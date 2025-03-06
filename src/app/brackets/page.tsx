'use client';

import SingleTeamEliminationBracket from '@/bracket-single/single-team-elim-bracket';
import TeamMatch from '@/components/team-match';
import { simpleTeamBracket, teamBrackets } from '@/mock-data/simple-data';
import React from 'react';

const page = () => {
  return (
    <div className='w-full h-full'>
      <SingleTeamEliminationBracket
        matches={teamBrackets}
        matchComponent={TeamMatch}
      />
    </div>
  );
};

export default page;
