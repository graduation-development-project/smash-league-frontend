'use client';
import { ConfigProvider, Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import BracketDetailsTour from '../../organisms/tournaments/bracket-details.tour';
import MatchDetailsTour from '../../organisms/tournaments/match-details.tour';
import PlayerDetailTour from '../../organisms/tournaments/player-detail.tour';
import StandingBoardDetailTour from '../../organisms/tournaments/standing-board-detail.tour';
import PostestForm from '../../organisms/tournaments/postest-form';
import { getOtherPrizeOfEventAPI, getTournamentEventDetailAPI } from '@/services/tournament';
import AwardEventForm from './award-event.form';

const EventAgeDetails = ({
  tournamentId,
  eventId,
  mainColor,
  isOrganizer,
  tour,
}: {
  tournamentId: string;
  eventId: string;
  mainColor: string;
  isOrganizer: boolean;
  tour: any;
}) => {
  const [bracket, setBracket] = useState({});
  const [playerList, setPlayerList] = useState([]);
  const [matchList, setMatchList] = useState([]);
  const [eventDetail, setEventDetail] = useState<any>();
  const eventUUID = eventId.slice(eventId.indexOf('-') + 1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prizeEventList, setPrizeEventList] = useState<any[]>([]);

  // console.log('check tour details ', tour);

  const fetchGetTournamentEventDetailAPI = async () => {
    try {
      const res = await getTournamentEventDetailAPI(tournamentId);
      // console.log("Check res", res.data);
      // console.log("eventUUID", (res?.data.find((event: any) => event.id === eventUUID)));

      setEventDetail(res?.data.find((event: any) => event.id === eventUUID));
    } catch (error: any) {
      console.log(error);
    }
  };

  const getOtherPrizeOfEvent = async () => {
    try {
      const res = await getOtherPrizeOfEventAPI(eventUUID);
      console.log("Check all prize of event", res?.data);
      if (res.statusCode === 200 || res.statusCode === 201) {
        const excludedPrizeNames = [
          "championshipPrize",
          "runnerUpPrize",
          "thirdPlacePrize",
          "jointThirdPlacePrize",
        ];

        const otherPrizes = res?.data?.filter(
          (item: any) => !excludedPrizeNames.includes(item.prizeName)
        );

        setPrizeEventList(otherPrizes);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGetTournamentEventDetailAPI();

  }, [isOrganizer]);


  useEffect(() => {
    if (isOrganizer && eventDetail?.tournamentEventStatus === 'ENDED') {
      setIsModalOpen(true);
      getOtherPrizeOfEvent();
    }
  }, [eventDetail?.tournamentEventStatus, isOrganizer]);

  console.log("Check prizeEventList", prizeEventList);


  const [tabs, setTabs] = useState<TabsProps['items']>([
    {
      label: 'Bracket',
      key: 'bracket',
      children: (
        <BracketDetailsTour
          mainColor={mainColor}
          bracket={bracket}
          eventId={eventId}
          tournamentId={tournamentId}
        />
      ),
    },
    {
      label: 'Matches',
      key: 'matches',
      children: (
        <MatchDetailsTour
          mainColor={mainColor}
          matchList={matchList}
          eventId={eventId}
          tournamentId={tournamentId}
          isOrganizer={isOrganizer}
          tour={tour}
        />
      ),
    },
    {
      label: 'Players',
      key: 'players',
      children: <PlayerDetailTour mainColor={mainColor} eventId={eventId} />,
    },
    {
      label: 'Standing Board',
      key: 'standing-board',
      children: (
        <StandingBoardDetailTour mainColor={mainColor} eventId={eventId} />
      ),
    },

    ...(!isOrganizer
      ? [
        {
          label: 'Postest',
          key: 'postest',
          children: <PostestForm eventId={eventId} tournamentId={tournamentId} />,
        },
      ]
      : []),
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

      {prizeEventList && prizeEventList?.length > 0 && <AwardEventForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        eventUUID={eventUUID}
        prizeEventList={prizeEventList}
      />}
    </div>
  );
};

export default EventAgeDetails;
