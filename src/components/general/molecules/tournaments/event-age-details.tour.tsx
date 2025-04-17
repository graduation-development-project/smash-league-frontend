'use client';
import { ConfigProvider, Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import BracketDetailsTour from '../../organisms/tournaments/bracket-details.tour';
import MatchDetailsTour from '../../organisms/tournaments/match-details.tour';
import PlayerDetailTour from '../../organisms/tournaments/player-detail.tour';

const EventAgeDetails = ({
  tournamentId,
  eventId,
  mainColor,
}: {
  tournamentId: string;
  eventId: string;
  mainColor: string;
}) => {
  const [bracket, setBracket] = useState({});
  const [playerList, setPlayerList] = useState([]);
  const [matchList, setMatchList] = useState([]);
  // console.log('check ', eventId);


  const [tabs, setTabs] = useState<TabsProps['items']>([
    {
      label: 'Bracket',
      key: 'bracket',
      children: <BracketDetailsTour
        mainColor={mainColor}
        bracket={bracket}
        eventId={eventId}
        tournamentId={tournamentId}
      />,
    },
    {
      label: 'Matches',
      key: 'matches',
      children: (
        <MatchDetailsTour mainColor={mainColor} matchList={matchList} eventId={eventId} tournamentId={tournamentId} />
      ),
    },
    {
      label: 'Players',
      key: 'players',
      children: (
        <PlayerDetailTour mainColor={mainColor} eventId={eventId} />
      ),
    },
    // {
    //   label: 'Check List',
    //   key: 'attendants-check-list',
    //   children: <AttendantsCheck />,
    // },
  ]);
  return (
    <div className="px-3 w-full h-full">
      <Tabs
        defaultActiveKey="1"
        // type="card"
        size={'small'}
        style={{ marginBottom: 32, fontWeight: 600 }}
        items={tabs}
      // onClick={}
      />

    </div>
  );
};

export default EventAgeDetails;
