'use client';
import SingleTeamEliminationBracket from '@/bracket-single/single-team-elim-bracket';
import TeamMatch from '@/components/team-match';
import Match from '@/core/match-wrapper';
import React, { useEffect, useState } from 'react';
import { getMatchesOfTournamentEventAPI } from '../../services/tournament';

const Brackets = () => {
  const [bracket, setBracket] = useState([]);

  const getMatchesOfTournamentEvent = async () => {
    try {
      const res = await getMatchesOfTournamentEventAPI(
        'c8ecf934-6c71-44b9-b34c-e9a2a9038e9a',
      );
      setBracket(res?.data?.data);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getMatchesOfTournamentEvent();
  }, []);

  return (
    <div className="w-full h-full">
      <SingleTeamEliminationBracket matches={bracket} matchComponent={Match} />
    </div>
  );
};

export default Brackets;
